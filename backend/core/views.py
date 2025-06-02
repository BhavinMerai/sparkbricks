from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.mail import send_mail
from django.http import JsonResponse

from .serializers import (
    UserProfileSerializer,
    CustomPasswordResetSerializer,
    CustomPasswordResetConfirmSerializer
)

from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView


# ✅ Protected route test
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You have accessed a protected route."})


# ✅ User profile view
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Email testing route (optional)
def test_email(request):
    send_mail(
        subject='Test Email',
        message='This is a test email from Django!',
        from_email='shivam677.sp@gmail.com',
        recipient_list=['your_email@gmail.com'],
        fail_silently=False,
    )
    return JsonResponse({'message': 'Email sent!'})


# ✅ Custom password reset view
class CustomPasswordResetView(PasswordResetView):
    serializer_class = CustomPasswordResetSerializer


# ✅ Custom password reset confirm view
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    serializer_class = CustomPasswordResetConfirmSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.core.mail import send_mail
from django.http import JsonResponse

from .serializers import (
    UserProfileSerializer,
    CustomPasswordResetSerializer,
    CustomPasswordResetConfirmSerializer
)

from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView


# ✅ Protected route test
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You have accessed a protected route."})


# ✅ User profile view
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ✅ Email testing route (optional)
def test_email(request):
    send_mail(
        subject='Test Email',
        message='This is a test email from Django!',
        from_email='shivam677.sp@gmail.com',
        recipient_list=['your_email@gmail.com'],
        fail_silently=False,
    )
    return JsonResponse({'message': 'Email sent!'})


# ✅ Custom password reset view
class CustomPasswordResetView(PasswordResetView):
    serializer_class = CustomPasswordResetSerializer


# ✅ Custom password reset confirm view
class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    serializer_class = CustomPasswordResetConfirmSerializer
