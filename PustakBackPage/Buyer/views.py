from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from Users.models import BuyerModel, CustomUser
from .models import BuyerProfile

# Buyer Profile
@api_view(['GET'])
def get_profile(request):
    username = request.query_params.get("username")
    user = CustomUser.objects.filter(username=username).first()
    buyer = BuyerModel.objects.filter(user=user).first()
    buyer_profile = BuyerProfile.objects.filter(buyer=buyer).first()

    if buyer_profile is not None:
        data = {
            "name" : f"{buyer_profile.buyer.user.first_name} {buyer_profile.buyer.user.last_name}",
            "username" : buyer_profile.buyer.user.username,
            "location" : buyer_profile.buyer.city,
            "following" : buyer_profile.following,
            "followers" : buyer_profile.followers,
            "description" : buyer_profile.description,
        }
        return Response(
            {"data": data,
            "message": "Buyer Profile data sent"}, 
            status=status.HTTP_200_OK)
    else:
        return Response(
            {"data": None,
            "message": "Unable to fetch buyer profile data"}, 
            status=status.HTTP_204_NO_CONTENT)

# Send Buy book request
@api_view(['GET'])
def send_buy_book_request(request):
    return Response({"data": "Buy Book Request"})

# Exchange book request
@api_view(['GET'])
def send_exchange_book_request(request):
    return Response({"data": "Exchange book request"})

# Accept request to exchange
@api_view(['POST'])
def accept_exchange_request_from_buyer(request):
    return Response({"data": "Accept exchange request"})

# Sell book
@api_view(['POST'])
def sell_book_to_others(request):
    return Response({"data": "Sell book request"})

# Accept request to sell
@api_view(['POST'])
def accept_sell_request_from_buyer(request):
    return Response({"data": "Accept sell request"})

# Buy request from other buyer
@api_view(['GET'])
def all_buy_book_requests(request):
    return Response({"data": "Buy book requests"})

# Exchange request from other buyer
@api_view(['GET'])
def all_exchange_book_requests(request):
    return Response({"data": "Exchange book requests"})
