from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class ActiveConnection(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    driver = models.CharField(max_length=255)
    server = models.CharField(max_length=255)
    db_user = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    is_connected = models.BooleanField(default=False)
    last_connected = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Connection for {self.user.username}"
