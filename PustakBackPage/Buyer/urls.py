from django.urls import path, include
from Buyer import views

urlpatterns = [
    path('profile/', views.get_profile, name="Buyers urls"),
]