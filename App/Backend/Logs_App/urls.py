from django.urls import path
from .views import *

urlpatterns = [
    path('connection-logs/', ConnectionLogListCreate.as_view(), name='connection_log_list_create'),
    path('connection-logs/<int:pk>/', ConnectionLogDetail.as_view(), name='connection_log_detail'),

]