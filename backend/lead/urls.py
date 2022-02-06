from django.urls import path
from .views import LeadList, LeadDetail, DeveloperList, DeveloperLead, DeveloperDelete

urlpatterns = [
    path("", LeadList.as_view(), name="leadList"),
    path("detail/<int:pk>/", LeadDetail.as_view(), name="leadDetail"),
    path("developers/", DeveloperList.as_view(), name="developerList"),
    path("developers/<int:pk>/", DeveloperLead.as_view(), name="developerLead"),
    path(
        "developers/remove/<int:pk>/", DeveloperDelete.as_view(), name="developerDelete"
    ),
]
