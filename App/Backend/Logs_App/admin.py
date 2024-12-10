from django.contrib import admin
from .models import *
# Register your models here.

class ConnectionLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'driver', 'server', 'db_user', 'timestamp', 'status')  # Incluir last_connected
    search_fields = ('user__username', 'server', 'db_user')

admin.site.register(ConnectionLog, ConnectionLogAdmin)

class AuditoryLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'timestamp', 'control_results')  
    search_fields = ('user__username',)

admin.site.register(AuditoryLog, AuditoryLogAdmin)