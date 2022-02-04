from django.urls import path
from .views import LeadList, LeadDetail, DeveloperList, DeveloperAdd

urlpatterns = [
    path("", LeadList.as_view(), name="leadList"),
    path("detail/<int:pk>/", LeadDetail.as_view(), name="leadDetail"),
    path("developers/", DeveloperList.as_view(), name="developerList"),
    path("developers/add/", DeveloperAdd.as_view(), name="developerAdd"),
]
