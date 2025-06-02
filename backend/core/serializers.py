from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.serializers import LoginSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.forms import PasswordResetForm, SetPasswordForm
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
import requests
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from allauth.account.models import EmailAddress
from django.core.mail import send_mail

User = get_user_model()


# ✅ Helper to encode UID
def user_pk_to_url_str(user):
    return urlsafe_base64_encode(force_bytes(user.pk))


# ✅ User Profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio']
        read_only_fields = ['id', 'email']

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


# ✅ Login with reCAPTCHA
class LoginWithCaptchaSerializer(LoginSerializer):
    recaptcha_token = serializers.CharField(write_only=True)

    def validate(self, attrs):
        recaptcha_token = attrs.pop('recaptcha_token', None)

        if not recaptcha_token:
            raise serializers.ValidationError({"recaptcha_token": "This field is required."})

        response = requests.post('https://www.google.com/recaptcha/api/siteverify', data={
            'secret': settings.RECAPTCHA_SECRET_KEY,
            'response': recaptcha_token,
        })

        result = response.json()
        if not result.get('success'):
            raise serializers.ValidationError({"recaptcha_token": "Invalid reCAPTCHA. Please try again."})

        return super().validate(attrs)


# ✅ Custom Password Reset Serializer
class CustomPasswordResetSerializer(PasswordResetSerializer):
    password_reset_form_class = PasswordResetForm

    def save(self):
        print("✅ CustomPasswordResetSerializer is being used!")
        request = self.context.get('request')
        email = self.validated_data["email"]
        form = self.password_reset_form_class(data={"email": email})

        if form.is_valid():
            users = User._default_manager.filter(email__iexact=email, is_active=True)
            for user in users:
                email_obj = EmailAddress.objects.filter(user=user, email=user.email).first()
                if email_obj and not email_obj.verified:
                    continue

                uid = user_pk_to_url_str(user)
                token = default_token_generator.make_token(user)

                frontend_base = getattr(settings, "FRONTEND_URL", "http://localhost:3000/")
                reset_path = getattr(settings, "PASSWORD_RESET_CONFIRM_URL", "reset-password/[uid]/[token]/")
                full_link = frontend_base.rstrip('/') + '/' + reset_path.replace('[uid]', uid).replace('[token]', token)

                subject = render_to_string('account/password_reset_subject.txt', {
                    'user': user,
                    'site_name': 'SparkBricks',
                }).strip()

                html_message = render_to_string('account/password_reset_email.html', {
                    'email': email,
                    'domain': frontend_base,
                    'site_name': 'SparkBricks',
                    'uid': uid,
                    'user': user,
                    'token': token,
                    'protocol': 'https' if request.is_secure() else 'http',
                    'frontend_reset_url': full_link,
                })

                plain_message = strip_tags(html_message)

                send_mail(
                    subject=subject,
                    message=plain_message,
                    html_message=html_message,
                    from_email=getattr(settings, 'DEFAULT_FROM_EMAIL'),
                    recipient_list=[email],
                    fail_silently=False,
                )
        else:
            raise serializers.ValidationError("Invalid email.")


# ✅ Custom Confirm Serializer — Fixes UID error
class CustomPasswordResetConfirmSerializer(PasswordResetConfirmSerializer):
    def validate(self, attrs):
        try:
            uid = force_str(urlsafe_base64_decode(attrs['uid']))
            self.user = User._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError({'uid': ['Invalid value']})

        if not default_token_generator.check_token(self.user, attrs['token']):
            raise serializers.ValidationError({'token': ['Invalid or expired token']})

        self.set_password_form = SetPasswordForm(user=self.user, data=attrs)
        if not self.set_password_form.is_valid():
            raise serializers.ValidationError(self.set_password_form.errors)

        return attrs

    def save(self):
        self.set_password_form.save()
