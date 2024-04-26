from rest_framework import serializers
from api.models import Category

from api.models import Diary, Comment


class CategorySerializer1(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name')


class DiarySerializer1(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(default="")
    body = serializers.CharField(default="")
    description = serializers.CharField(default="")
    isPublic = serializers.BooleanField(default=False)
    likes = serializers.IntegerField(default=0)
    authorId = serializers.IntegerField(default=0)
    authorName = serializers.CharField(default="")
    image = serializers.CharField(default="")
    bold = serializers.BooleanField(default=False)
    italic = serializers.BooleanField(default=False)
    underline = serializers.BooleanField(default=False)
    fontSize = serializers.CharField(default=24)
    fontColor = serializers.CharField(default="")
    fontFamily = serializers.CharField(default="")
    mood = serializers.CharField(default="")

    def create(self, validated_data):
        category = Category.objects.get(id = validated_data.pop('mood'))
        mood = Diary.objects.create(mood=category, **validated_data)
        return mood

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.body = validated_data.get('body',instance.body)
        instance.description = validated_data.get('description',instance.description)
        instance.isPublic = validated_data.get('isPublic',instance.isPublic)
        instance.likes = validated_data.get('likes',instance.likes)
        instance.authorid = validated_data.get('authorId',instance.authorId)
        instance.authorName = validated_data.get('authorName',instance.authorName)
        instance.image = validated_data.get('image',instance.image)
        instance.italic = validated_data.get('italic',instance.italic)
        instance.underline = validated_data.get('underline',instance.underline)
        instance.fontSize = validated_data.get('fontSize',instance.fontSize)
        instance.fontColor = validated_data.get('fontColor',instance.fontColor)
        instance.fontFamily = validated_data.get('fontFamily',instance.fontFamily)
        instance.save()
        return instance


class DiarySerializer2(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = '__all__'


class CommentSerializer1(serializers.Serializer):
    body = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255)
    userId = serializers.IntegerField()
    createdAt = serializers.CharField()
    diary_id = serializers.CharField(default="")

    def create(self, validated_data):
        diary = Diary.objects.get(id = validated_data.pop('diary_id'))
        return Comment.objects.create(diary=diary, **validated_data)
    

class CommentSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

