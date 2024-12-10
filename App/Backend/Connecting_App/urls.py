from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('active-connections/', ActiveConnectionListCreate.as_view(), name='active_connection_list_create'),
    path('active-connections/<int:pk>/', ActiveConnectionDetail.as_view(), name='active_connection_detail'),
    # ------------------------------------------------------------------------------------------------------ #
    path('connect/', views.connect_view, name = 'connect'),
    path('disconnect/', views.disconnect_view, name='disconnect'),    
]