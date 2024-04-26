from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def str(self):
        return f'{self.id}: {self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Diary(models.Model):
    title = models.CharField(max_length=255)
    body = models.CharField(max_length=255,default="")
    description = models.TextField(max_length=500)
    isPublic = models.BooleanField(default=False)
    likes = models.IntegerField(default=0)
    authorId = models.IntegerField(default=0)
    authorName = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    bold = models.BooleanField(default=False)
    italic = models.BooleanField(default=False)
    underline = models.BooleanField(default=False)
    fontSize = models.CharField(max_length=255)
    fontColor = models.CharField(max_length=255)
    fontFamily = models.CharField(max_length=255)
    mood = models.ForeignKey(Category, on_delete=models.CASCADE)

    def to_json(self):
        return{
            'id':self.id,
            'title':self.title,
            'body':self.body,
            'description':self.description,
            'isPublic':self.isPublic,
            'likes':self.likes,
            'authorId':self.authorId,
            'authorName':self.authorName,
            'image':self.image,
            'bold':self.bold,
            'italic':self.italic,
            'underline':self.underline,
            'fontSize':self.underline,
            'fontColor':self.fontColor,
            'fontFamily':self.fontFamily,
            'mood':self.mood
        }
    
    class Meta:
        verbose_name = 'Diary'
        verbose_name_plural = 'Diaries'
        


class Comment(models.Model):
    body = models.CharField(max_length=255)
    username = models.CharField(max_length=255)
    userId = models.IntegerField()
    createdAt = models.CharField(max_length=255)
    diary = models.ForeignKey(Diary,on_delete=models.CASCADE)
    
    class Meta:
        verbose_name = 'Comment'
        verbose_name_plural = 'Comments'

    def str(self):
        return f'{self.id}: {self.username}'

    def to_json(self):
        return {
            'id': self.id,
            'body': self.body,
            'username': self.username,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'diary': self.diary
        }
    
class User(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    mail = models.CharField(max_length=255)

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'mail': self.mail,
        }


