import os
from pathlib import Path
import logging

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'your-secret-key'  # Replace with secure key in production
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1', 'DESKTOP-90UR334']

AUTH_USER_MODEL = 'core.CustomUser'

INSTALLED_APPS = [
    "jazzmin",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.sites',

    'rest_framework',
    'rest_framework.authtoken',

    'dj_rest_auth',
    'dj_rest_auth.registration',

    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'allauth.socialaccount.providers.github',

    'corsheaders',
    'core',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

ROOT_URLCONF = 'django_auth.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
            os.path.join(BASE_DIR, 'core', 'templates'),  # ✅ ensure custom email templates are picked
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'django_auth.wsgi.application'

JAZZMIN_SETTINGS = {
    "site_title": "Sparkbrick Admin",
    "site_header": "Sparkbrick",
    "site_brand": "Sparkbrick",
    "theme": "darkly",
    "welcome_sign": "Welcome to Sparkbrick Dashboard",
    "copyright": "Sparkbrick Inc.",
    "search_model": ["auth.User"],  # Enable global search on User model

    "topmenu_links": [
        {"name": "Home", "url": "/", "permissions": ["auth.view_user"]},
    ],
    
    "show_sidebar": True,
    "navigation_expanded": True,

    "user_avatar": None,  # or "yourapp.YourModel.avatar"
}


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

SITE_ID = 1

# === REST Framework Settings ===
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# === dj-rest-auth Settings ===
REST_USE_JWT = False
DJANGO_REST_AUTH = {
    'USE_JWT': False,
    'LOGIN_SERIALIZER': 'core.serializers.LoginWithCaptchaSerializer',
    'PASSWORD_RESET_CONFIRM_URL': 'reset-password/[uid]/[token]/',
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'LOGOUT_ON_PASSWORD_CHANGE': False,
    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': True,
}

# === Allauth Settings ===
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

# ✅ Fix the email confirmation redirect issue
ACCOUNT_CONFIRM_EMAIL_REDIRECT_URL = '/auth'  # frontend route after email verify
ACCOUNT_DEFAULT_HTTP_PROTOCOL = 'http'        # adjust to https in production

# === OAuth Providers ===
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
            'client_id': 'your-google-client-id',
            'secret': 'your-google-secret',
            'key': ''
        }
    },
    'github': {
        'APP': {
            'client_id': 'your-github-client-id',
            'secret': 'your-github-secret',
        }
    }
}

# settings.py

ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = 'http://localhost:3000/auth'
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = 'http://localhost:3000/auth'


# === Gmail SMTP Email Settings ===
EMAIL_BACKEND = 'django_auth.email_backend.EmailBackend'  # Custom backend
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'shivam677.sp@gmail.com'
EMAIL_HOST_PASSWORD = 'nqimjgixeohkeqco'
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# === Logging for Email Troubleshooting ===
logging.basicConfig(level=logging.DEBUG)




# === reCAPTCHA keys ===
RECAPTCHA_SECRET_KEY = '6LeRoj8rAAAAALIh5ZXgg6vJy_-00DZSYq_L76IT'
RECAPTCHA_SITE_KEY = '6LeRoj8rAAAAAKZbaAptJFmAxzlk5PXsyVboNj6D'

# === CORS ===
CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOW_CREDENTIALS = True



# === Frontend base URL for reset password emails ===
FRONTEND_URL = 'http://localhost:3000/'

# === Password Reset Confirm Custom Path ===
PASSWORD_RESET_CONFIRM_URL = 'reset-password/[uid]/[token]/'

# === Custom Serializers ===
REST_AUTH_SERIALIZERS = {
    'PASSWORD_RESET_SERIALIZER': 'core.serializers.CustomPasswordResetSerializer',
}
