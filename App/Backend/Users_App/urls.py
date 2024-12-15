from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
]


# UserViewSet:
#   POST /users/register/ para registrar usuarios.
#   POST /users/login/ para iniciar sesión.
#   GET /users/profile/ para obtener el perfil del usuario autenticado.
#   POST /users/logout/ para cerrar sesión.