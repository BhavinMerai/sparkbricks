from django.urls import path
from .views import ProtectedView, UserProfileView, test_email

urlpatterns = [
    path('protected/', ProtectedView.as_view(), name='protected-view'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('test-email/', test_email, name='test-email'),  # SMTP test route
]
