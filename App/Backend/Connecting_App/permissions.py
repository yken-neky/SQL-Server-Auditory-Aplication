from rest_framework.permissions import BasePermission
from .models import ActiveConnection 

class HasOnServiceCookie(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        active_conn = ActiveConnection.objects.filter(user=user).first()
        if active_conn.is_connected == True:
            return active_conn

class NoOnServiceAccess(BasePermission):
    # Permiso personalizado para denegar acceso si la cookie 'OnService' está presente.
    def has_permission(self, request, view):
        user = request.user
        active_conn = ActiveConnection.objects.filter(user=user).first()
        if active_conn.is_connected != True:
            return active_conn
