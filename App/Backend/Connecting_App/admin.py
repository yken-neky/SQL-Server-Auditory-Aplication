from django.contrib import admin
from .models import *
# Register your models here.

class ActiveConnectionAdmin(admin.ModelAdmin):
    list_display = ('user', 'driver', 'server', 'db_user', 'is_connected', 'last_connected')  # Incluir last_connected
    search_fields = ('user__username', 'server', 'db_user')  # Campos de búsqueda opcionales

admin.site.register(ActiveConnection, ActiveConnectionAdmin)