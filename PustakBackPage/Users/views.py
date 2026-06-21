from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import BuyerModel, SellerModel, CustomUser
from Seller.models import SellerProfile
from Buyer.models import BuyerProfile
from rest_framework.permissions import AllowAny
# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def login_buyer(request):
    username = request.data.get("username")
    password = request.data.get("password")

    buyer = authenticate(username=username, password=password)
    print(buyer)
    if buyer is not None:
        refresh = RefreshToken.for_user(buyer)
        return Response({
            "role": "buyer",
            "message": "Successfully Logged In",
            "user": {
                "username": username
            },
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "completed": True
        }, status=status.HTTP_200_OK)

    return Response({"message": "Invalid Credentials", "completed": False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
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
            "refresh": str(refresh),
            "completed": True
        }, status=status.HTTP_200_OK)
    
    return Response({"message": "Invalid Credentials", "completed": False}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_buyer(request):
    username = request.data.get("username")
    
    check_username = CustomUser.objects.filter(username=username).values().first()
    # print(check_username)
    if check_username is not None:
        return Response({"message": "Username already taken", "completed": False}, status=status.HTTP_306_RESERVED)
    
    email = request.data.get("email")
    check_email = BuyerModel.objects.filter(email=email).first()
    if check_email is not None:
        return Response({"message": "Email already registered", "completed": False}, status=status.HTTP_306_RESERVED)

    first_name = request.data.get("first_name")
    last_name = request.data.get("last_name")
    password = request.data.get("password")
    age = int(request.data.get("age"))
    gender = request.data.get("gender")
    contact_number = request.data.get("contact_number")
    city = request.data.get("city")

    user = CustomUser.objects.create(username=username,
                                      first_name=first_name,
                                      last_name=last_name,
                                      role="buyer")
    
    user.set_password(password)
    user.save()
    buyer = BuyerModel.objects.create(user=user, 
                                      email=email, 
                                      age=age, 
                                      contact_number=contact_number,
                                      gender=gender,
                                      city=city)

    BuyerProfile.objects.create(buyer=buyer)
    return Response({"message": "Buyer registered successfully!", "completed": True}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_seller(request):
    username = request.data.get("username")
    check_username = CustomUser.objects.filter(username=username).first()
    if check_username is not None:
        return Response({"message": "Username already taken", "completed": False}, status=status.HTTP_306_RESERVED)
    
    email = request.data.get("email")
    check_email = BuyerModel.objects.filter(email=email).first()
    if check_email is not None:
        return Response({"message": "Email already registered", "completed": False}, status=status.HTTP_306_RESERVED)
    
    password = request.data.get("password")
    name = request.data.get("name")
    sellertype = request.data.get("sellertype")
    location = request.data.get("location")
    user = CustomUser.objects.create(username=username, 
                                      role="seller")
    
    user.set_password(password)
    user.save()
    seller = SellerModel.objects.create(user=user,
                                      email=email,
                                      sellertype=sellertype,
                                      location=location,
                                      name=name)
    
    SellerProfile.objects.create(seller=seller)
    return Response({"message": "Seller registered successfully!", "completed": True}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def logout_user(request):
    try:
        logout(request)
        return Response({"message": "Logout Successfully", "completed": True}, status=status.HTTP_200_OK)
    except:
        return Response({"message": "Something went wrong", "completed": False}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_user_detail(request):
    username=request.query_params.get("username")
    user=CustomUser.objects.filter(username=username).first()
    if not user:
        return Response({"message": "User not found.", 
                         "data": None, 
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
    
    if user.role == "seller":
        seller=SellerModel.objects.filter(user=user).first()
        if not seller:
            return Response({"message": "Unable to find seller.", 
                         "data": None,
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
        
        user_data = {
            "name": seller.name.title(),
            "location": seller.location.upper(),
            "phone": seller.contact_number,
            "email": seller.email
        }

        return Response({"message": "Seller data sent.", 
                         "data": user_data, "completed": True}, status=status.HTTP_200_OK)
    
    elif user.role == "buyer":
        buyer=BuyerModel.objects.filter(user=user).first()
        if not buyer:
            return Response({"message": "Unable to find buyer.", 
                         "data": None,
                         "completed": False}, status=status.HTTP_404_NOT_FOUND)
        
        user_data = {
            "name": (user.first_name + " " + user.last_name).strip().title(),
            "location": buyer.city.title(),
            "phone": buyer.contact_number,
            "email": buyer.email
        }

        return Response({"message": "Buyer data sent.", 
                         "data": user_data, "completed": True}, status=status.HTTP_200_OK)
    
    return Response({"message": "Invalid Request!", 
                     "data": None, "completed": False}, status=status.HTTP_406_NOT_ACCEPTABLE)