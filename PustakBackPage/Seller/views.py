from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from Users.models import SellerModel, CustomUser
from .models import SellerProfile
from rest_framework import status

# Seller profile
@api_view(['GET'])
def get_profile(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    seller = SellerModel.objects.filter(user=user).first()
    seller_profile = SellerProfile.objects.filter(seller=seller).first()

    if seller_profile is not None:
        data = {
            "name" : f"{seller_profile.seller.name}",
            "username" : seller_profile.seller.user.username,
            "location" : seller_profile.seller.location,
            "totalBooks" : seller_profile.total_books,
            "followers" : seller_profile.followers,
            "description" : seller_profile.description,
            "rating": seller_profile.rating
        }
        return Response(
            {"data": data,
            "message": "Seller Profile data sent"}, 
            status=status.HTTP_200_OK)
    else:
        return Response(
            {"data": None,
            "message": "Unable to fetch seller profile data"}, 
            status=status.HTTP_204_NO_CONTENT)

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