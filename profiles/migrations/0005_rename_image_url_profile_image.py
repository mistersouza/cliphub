# Generated by Django 3.2.23 on 2024-01-12 10:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_rename_onwer_profile_owner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='image_url',
            new_name='image',
        ),
    ]
