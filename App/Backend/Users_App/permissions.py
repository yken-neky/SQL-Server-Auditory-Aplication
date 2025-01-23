from rest_framework.permissions import BasePermission

class IsClient(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'cliente'

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == 'admin'

class IsClientAndOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.role == 'cliente' and obj.user == request.user
    
class IsOwner(BasePermission): 
    def has_object_permission(self, request, view, obj): 
        return obj.user == request.user
