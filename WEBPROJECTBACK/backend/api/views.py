import json

from rest_framework_jwt.utils import jwt_payload_handler
from django.conf import settings
from django.http import HttpResponseNotAllowed, JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework_jwt.views import obtain_jwt_token
import jwt
from rest_framework.decorators import api_view
from api.models import Category
from api.serializer import CommentSerializer1
from api.serializer import CommentSerializer2
from api.serializer import DiarySerializer2
from api.serializer import DiarySerializer1
from rest_framework.views import APIView
from rest_framework import status

from api.models import Diary,Comment
from django.contrib.auth import get_user_model
from rest_framework_jwt.settings import api_settings

@csrf_exempt 
def login(request):
    response = obtain_jwt_token(request)
    if response.status_code == 200:  
        return response
       


@csrf_exempt 
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        userName = data.get('userName')

        password = data.get('password')

        email = data.get('mail')

        lastName = data.get('image')

        user = User.objects.create_user(username=userName,password=password,email=email,last_name = lastName)

        user.save()

        return JsonResponse({'message': 'User created successfully.'})
    else:
        return JsonResponse({'message': 'Invalid request method.'})


@api_view(['GET', 'POST'])
@csrf_exempt
def list_of_diaries(request):
    if request.method == 'GET':
        diaries = Diary.objects.all()   
        serializer = DiarySerializer1(diaries, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = DiarySerializer1(data = request.data)
        # print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    

@api_view(['GET'])
@csrf_exempt
def diaries_of_user(request,author_id):

    if request.method == 'GET':
        try:
            diary = Diary.objects.filter(authorId=author_id)
        except Diary.DoesNotExist as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        # print(diary)
        serializer = DiarySerializer1(diary,many=True)
        # print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)


    


class DiariesView(APIView):
    def get(self, request):
        diaries = Diary.objects.all()
        serializer = DiarySerializer2(diaries, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = DiarySerializer2(data=request.data)
        # print(serializer.initial_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CommentariesView(APIView):
    def post(self, request):

        serializer = CommentSerializer2(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','DELETE','PUT'])
@csrf_exempt
def diary_detail(request,diary_id):
    if request.method == 'GET':
        try:
            diary = Diary.objects.get(id=diary_id)
        except Diary.DoesNotExist as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer = DiarySerializer1(diary)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        try:
            diary = Diary.objects.get(id=diary_id)
        except Diary.DoesNotExist as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        diary.delete()
        return Response({'deleted': True})
    elif request.method == 'PUT':
        try:
            diary = Diary.objects.get(id=diary_id)
        except Diary.DoesNotExist as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        serializer = DiarySerializer1(diary, data=request.data)
        if serializer.is_valid():
            # print('---------')
            # print(serializer.validated_data())
            serializer.save()
            return Response(serializer)
        return Response({'updated': True})
    

@api_view(['GET', 'POST'])
def comments(request):
    if request.method == 'GET':
        comments = Comment.objects.all()
        comments_json = [com.to_json() for com in comments]
        return JsonResponse(comments_json, safe=False)
    elif request.method == 'POST':
        serializer = CommentSerializer1(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@api_view(['GET'])
@csrf_exempt
def comments_by_diary(request, diary_id):
    if request.method == 'GET':
        comments = Comment.objects.filter(diary_id=diary_id)
        serializer = CommentSerializer1(comments, many=True)
        return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
 

@api_view(['PUT'])
@csrf_exempt  
def userUpdatePicture(request,user_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        print(data)
        user = User.objects.get(id=user_id)
        user.last_name = data.get('profileImage')
        user.save()
        return Response(data)
