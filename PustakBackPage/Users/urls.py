from django.urls import path, include

urlpatterns = [
    path('api/buyer/', include('Buyer.urls'), name="Buyers urls"),
    path('api/seller/', include('Seller.urls'), name="Seller urls")
]