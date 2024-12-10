from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('controls-info/', ControlsInformationListCreate.as_view(), name='active_connection_list_create'),
    path('control-info/<int:pk>/', ControlInformationDetail.as_view(), name='active_connection_detail'),
    # ------------------------------------------------------------------------------------------------------ #
    path('execute/', views.execute_query, name = 'exec_query'),
    path('execute/<int:id>/', views.execute_query, name = 'exec_query'),
]