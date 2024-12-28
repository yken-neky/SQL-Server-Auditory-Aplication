from django.urls import path
from rest_framework.documentation import include_docs_urls
from .views import *
from . import views

urlpatterns = [
    path('api/sql/controls/controls_info/', ControlsInformationList.as_view(), name='active_connection_list_create'),
    path('api/sql/controls/control_info/<int:pk>/', ControlInformationDetail.as_view(), name='active_connection_detail'),
    # ------------------------------------------------------------------------------------------------------ #
    path('api/sql/controls/execute/', views.execute_query, name = 'exec_query'),
    path('api/sql/controls/execute/<int:id>/', views.execute_query, name = 'exec_query'),
    # ------------------------------------------------------------------------------------------------------ #
    path('api/docs/', include_docs_urls(title="Controls Info + Exec Documentation API"))
]