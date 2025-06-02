from django.contrib import admin
from django.urls import path, include

from core.views import CustomPasswordResetView, CustomPasswordResetConfirmView

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ Override password reset and confirm views BEFORE including dj-rest-auth
    path('dj-rest-auth/password/reset/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('dj-rest-auth/password/reset/confirm/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('dj-rest-auth/', include('dj_rest_auth.urls')),
    path('dj-rest-auth/registration/', include('dj_rest_auth.registration.urls')),
    path('accounts/', include('allauth.urls')),
    path('api/', include('core.urls')),
]
