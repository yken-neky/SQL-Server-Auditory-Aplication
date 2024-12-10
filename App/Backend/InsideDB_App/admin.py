from django.contrib import admin
from .models import *
# Register your models here.

class Controls_Information_Admin(admin.ModelAdmin):
    list_display = ('chapter', 'index', 'name')  # Incluir más adelante nivel de peligrosidad
    search_fields = ('chapter', 'index')

class Controls_Scripts_Admin(admin.ModelAdmin):
    list_display = ('control_script_id','control_type')
    search_fields = ('control_type',)

admin.site.register(Controls_Information, Controls_Information_Admin)
admin.site.register(Controls_Scripts, Controls_Scripts_Admin)

