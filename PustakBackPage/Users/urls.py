from django.urls import path, include
from Users import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/token/refresh/', TokenRefreshView.as_view(), name="Token Refresh"),
    path('api/login-buyer/', views.login_buyer, name="Login Buyer"),
    path('api/login-seller/', views.login_seller, name="Login Seller"),
    path('api/register-buyer/', views.register_buyer, name="Register Buyer"),
    path('api/register-seller/', views.register_seller, name="Register Seller"),
    path('api/logout/', views.logout_user, name="Logout User"),
    path('api/buyer/', include('Buyer.urls'), name="Buyers urls"),
    path('api/seller/', include('Seller.urls'), name="Seller urls"),
]