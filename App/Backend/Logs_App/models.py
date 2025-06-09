from django.db import models
from Users_App.models import CustomUser
from InsideDB_App.models import Controls_Information
# Create your models here.

class ConnectionLog(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    driver = models.CharField(max_length=255)
    server = models.CharField(max_length=255)
    db_user = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('connected', 'Connected'), ('disconnected', 'Disconnected'), ('reconnected', 'Reconnected')])

    #def __str__(self):
    #    return f"{self.user.username} - {self.status} on {self.server} at {self.timestamp}"

# Tabla para almacenar auditorias completas y parciales 
class AuditoryLog(models.Model): 
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE) 
    type = models.CharField(max_length=50, choices=[('Completa', 'Completa'), ('parcial', 'Parcial')], default='Parcial')
    timestamp = models.DateTimeField(auto_now_add=True)
    server = models.ForeignKey(ConnectionLog, on_delete=models.CASCADE) 
    criticidad = models.FloatField(default=0)  # Porcentaje de criticidad

    def calcular_criticidad(self):
        results = self.results.all()
        total = results.count()
        falses = results.filter(result='FALSE').count()
        self.criticidad = round((falses / total) * 100, 2) if total > 0 else 0
        self.save(update_fields=["criticidad"])

    def __str__(self): 
        return f"AuditoryLog {self.id} for user {self.user.username} on {self.timestamp}"

class AuditoryLogResult(models.Model):
    auditory_log = models.ForeignKey(AuditoryLog, on_delete=models.CASCADE, related_name='results')
    control = models.ForeignKey(Controls_Information, on_delete=models.CASCADE)
    result = models.CharField(max_length=10)  # 'TRUE', 'FALSE', 'MANUAL', etc.

    class Meta:
        unique_together = ('auditory_log', 'control')
