from django.db import models
from Users_App.models import CustomUser
# Create your models here.

class ConnectionLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    driver = models.CharField(max_length=255)
    server = models.CharField(max_length=255)
    db_user = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('connected', 'Connected'), ('disconnected', 'Disconnected'), ('reconnected', 'Reconnected')])

    def __str__(self):
        return f"{self.user.username} - {self.status} at {self.timestamp}"

# Tabla para almacenar auditorias completas y parciales 
class AuditoryLog(models.Model): 
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE) 
    control_results = models.JSONField() 
    timestamp = models.DateTimeField(auto_now_add=True) 
    
    def __str__(self): 
        return f"AuditoryLog {self.id} for user {self.user.username} on {self.timestamp}"