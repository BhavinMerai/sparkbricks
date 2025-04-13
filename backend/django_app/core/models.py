from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('learner', 'Learner'),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='learner')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
