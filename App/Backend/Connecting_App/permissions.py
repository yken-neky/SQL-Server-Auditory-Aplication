from rest_framework.permissions import BasePermission
from .models import ActiveConnection

class HasOnServiceCookie(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        active_conn = ActiveConnection.objects.filter(user=user, is_connected=True).exists()
        return active_conn and request.COOKIES.get('OnService') == 'true'

class NoOnServiceAccess(BasePermission):
    # Permiso personalizado para denegar acceso si la cookie 'OnService' está presente.
    def has_permission(self, request, view):
        # Verifica si la cookie 'OnService' no está presente o no tiene el valor 'true'
        return request.COOKIES.get('OnService') != 'true'
