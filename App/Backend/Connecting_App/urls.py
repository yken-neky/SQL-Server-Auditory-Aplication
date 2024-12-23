from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('sql/active-connections/', ActiveConnectionListCreate.as_view(), name='active_connection_list_create'),
    path('sql/active-connections/<int:pk>/', ActiveConnectionDetail.as_view(), name='active_connection_detail'),
    # ------------------------------------------------------------------------------------------------------ #
    path('sql/connect/', views.connect_view, name = 'connect'),
    path('sql/disconnect/', views.disconnect_view, name='disconnect'),    
]