# Generated by Django 3.2.18 on 2023-05-02 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20230501_1108'),
    ]

    operations = [
        migrations.AddField(
            model_name='diary',
            name='mood',
            field=models.CharField(default='', max_length=255),
        ),
    ]