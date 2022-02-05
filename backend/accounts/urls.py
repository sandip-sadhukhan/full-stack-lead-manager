from django.urls import path
from .views import SignupView, GetUserInformation

urlpatterns = [
    path("signup/", SignupView.as_view()),
    path("get-user-info/", GetUserInformation.as_view()),
]
