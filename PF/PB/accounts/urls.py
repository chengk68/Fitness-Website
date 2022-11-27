from django.urls import path
from accounts.views import SignupView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView

app_name = "accounts"

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', TokenObtainPairView.as_view()),
    path('profile/view/', ProfileView.as_view())
]
