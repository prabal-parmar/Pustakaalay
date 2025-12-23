from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from Users.models import SellerModel, CustomUser
from .models import SellerProfile
from rest_framework import status

# Seller profile
@api_view(['GET'])
def get_profile(request):
    username = request.data.get("username")
    user = CustomUser.objects.filter(username=username).first()
    seller = SellerModel.objects.filter(user=user).first()
    seller_profile = SellerProfile.objects.filter(seller=seller).first()

    data = {
        "first_name" : seller_profile.seller.user.first_name,
        "last_name" : seller_profile.seller.user.last_name,
        "username" : seller_profile.seller.user.username,
        "total_books" : seller_profile.total_books,
        "followers" : seller_profile.followers,
        "description" : seller_profile.description
    }

    return Response(
        {"data": data,
         "message": "Seller Profile data sent"}, 
         status=status.HTTP_200_OK)

def update_profile(request):
    return Response({"data": "Update Profile"})

# Buy book request
@api_view(['GET'])
def buy_book_request(request):
    return Response({"data": "book request sent"})

# Accept request to sell
@api_view(['POST'])
def accept_sell_request(request):
    return Response({"data": "Accept request"})

# Sell book
@api_view(['POST'])
def sell_book_seller(request):
    return Response({"data": "Books to sell."})

# Seller books 
@api_view(['GET'])
def seller_all_books(request):
    return Response({"data": "Seller All Books"})