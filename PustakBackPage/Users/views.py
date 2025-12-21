from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
# Create your views here.

@api_view(['POST'])
def login_buyer(request):
    username = request.data.get("username")
    password = request.data.get("password")

    buyer = authenticate(username=username, password=password)

    if buyer is not None and buyer.role == "buyer":
        refresh = RefreshToken.for_user(buyer)
        return Response({
            "role": "buyer",
            "message": "Successfully Logged In",
            "user": {
                "username": username
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)
    
    return Response({"message": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def login_seller(request):
    username = request.data.get("username")
    password = request.data.get("password")

    seller = authenticate(username=username, password = password)

    if seller is not None and seller.role == "seller":
        refresh = RefreshToken.for_user(seller)
        return Response({
            "role": "seller",
            "message": "Successfully Logged In",
            "user": {
                "username": username
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        }, status=status.HTTP_200_OK)
    
    return Response({"message": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def register_buyer(request):
    return Response({"data": "Register Buyer"})

@api_view(['POST'])
def register_seller(request):
    return Response({"data": "Register Seller"})