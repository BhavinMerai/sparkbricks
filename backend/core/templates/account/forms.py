# accounts/forms.py

from allauth.account.forms import ResetPasswordForm
from django.conf import settings

class CustomResetPasswordForm(ResetPasswordForm):
    def save(self, request, **kwargs):
        # Generate the reset URL using frontend settings
        uid = self.user_pk_to_url_str(self.users[0])
        token = self.token_generator.make_token(self.users[0])
        reset_url = f"{settings.FRONTEND_URL}{settings.PASSWORD_RESET_CONFIRM_URL}".replace("[uid]", uid).replace("[token]", token)

        # Send the email with the custom reset URL
        self.send_mail(
            subject_template_name='account/email/password_reset_subject.txt',
            email_template_name='account/email/password_reset_email.html',
            context={
                'email': self.cleaned_data["email"],
                'domain': settings.FRONTEND_URL,
                'site_name': 'Your Site Name',
                'uid': uid,
                'user': self.users[0],
                'token': token,
                'protocol': 'https',
                'frontend_reset_url': reset_url,
            },
            from_email=None,
            to_email=self.cleaned_data["email"],
        )
