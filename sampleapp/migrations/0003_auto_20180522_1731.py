# Generated by Django 2.0 on 2018-05-22 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sampleapp', '0002_auto_20180521_1551'),
    ]

    operations = [
        migrations.AlterField(
            model_name='translation',
            name='notes',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
