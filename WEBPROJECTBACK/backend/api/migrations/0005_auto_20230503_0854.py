# Generated by Django 3.2.18 on 2023-05-03 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_diary_mood'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diary',
            name='authorId',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='diary',
            name='likes',
            field=models.IntegerField(default=0),
        ),
    ]
