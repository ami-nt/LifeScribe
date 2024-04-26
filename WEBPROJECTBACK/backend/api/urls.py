from django.contrib import admin
from django.urls import include, path

from api import views
# from api import register


urlpatterns = [
    path('login/', views.login),
    path('register/', views.register),
    path('diaries/', views.DiariesView.as_view()),
    path('users/change_profile_pic/<int:user_id>', views.userUpdatePicture),
    path('diaries/<int:diary_id>/', views.diary_detail),
    path('diaries_of_user/<int:author_id>/',views.diaries_of_user),
    path('commentaries/', views.CommentariesView.as_view()),
    path('diaries/<int:diary_id>/commentaries/', views.comments_by_diary)
]