# Generated by Django 3.2.18 on 2023-05-04 12:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_diary_body'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='diary_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.diary'),
        ),
    ]
