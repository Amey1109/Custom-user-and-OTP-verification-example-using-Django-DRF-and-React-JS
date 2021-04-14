from django.shortcuts import render
from django.shortcuts import render
import os
import random
import math

# * Rest Framework Imports
from rest_framework.response import Response
from rest_framework.decorators import api_view

# * Twilio Imports
from twilio.rest import Client


# * models Import
from .models import OTPVerifiaction
from .models import CustomUser

#* Errors
from django.db import IntegrityError


# * Generating OTP
def generateOTP():
    digits = "0123456789"
    OTP = ""
    for i in range(4):
        OTP += digits[math.floor(random.random() * 10)]

    return OTP


# *Checks OTP with the otp recevied from the GET Request

def generatingOTP(number):
    OTP = generateOTP()

    return OTP


# * Checking the OTP

@api_view(['GET', 'POST'])
def otpGeneration(request):
    number = request.data['number']
    generatedOTP = generatingOTP(number)
    if generatedOTP:
        data = OTPVerifiaction(phone_number=number, otp=generatedOTP)
        data.save()
        print(generatedOTP)
        return Response({"OTPSent": True})
    else:
        return Response({"OTPSent": False})


@api_view(['PUT'])
def checkOTP(request):
    number = request.data['number']
    otp = request.data['otp']
    generatedOTP = OTPVerifiaction.objects.filter(
        phone_number=number).values_list('otp')
    if generatedOTP[0][0] == otp:
        data = OTPVerifiaction.objects.get(phone_number=number)
        data.is_verfied = True
        data.save()
        return Response({"status": True})

    else:
        return Response({"status": False})


@api_view(['POST'])
def registerUser(request):
    user_name = request.data['username']
    email = request.data['email']
    contact_number = request.data['number']
    password = request.data['password']
    user = CustomUser(user_name = user_name)
    user.email = email
    user.contact_number = contact_number
    user.set_password(password)
    try:
        user.save()
        otp_clutter = OTPVerifiaction.objects.get(phone_number = contact_number)
        otp_clutter.delete()
        return Response({"IntegrityError": False})
    except IntegrityError as e:
        return Response({"IntegrityError" : True})
    

