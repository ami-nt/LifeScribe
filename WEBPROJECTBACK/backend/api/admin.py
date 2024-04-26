from django.contrib import admin
from api.models import Category
from api.models import Diary, Comment

admin.site.register(Diary)
admin.site.register(Comment)
admin.site.register(Category)

class DiaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'body','description','isPublic','likes','authorId','authorName','image','bold','italic','underline','fontSize','fontColor','fontFamily','mood')
