from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    ROLE_CHOICES = (
        ('client', 'Client'),
        ('admin', 'Admin'),
    )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='client')

    def save(self, *args, **kwargs):
        self.last_login = timezone.now()
        super(CustomUser, self).save(*args, **kwargs)
