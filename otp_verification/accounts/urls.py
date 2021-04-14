from django.urls import path,include
from accounts import views


urlpatterns = [
    path('checkOTP/', views.checkOTP ),
    path('sendOTP/',views.otpGeneration),
    path('registerUser/',views.registerUser)
]