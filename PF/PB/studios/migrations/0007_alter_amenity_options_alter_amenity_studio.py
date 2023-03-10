# Generated by Django 4.1.3 on 2022-11-11 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0006_remove_amenity_studio_amenity_studio'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='amenity',
            options={'verbose_name_plural': 'categories'},
        ),
        migrations.AlterField(
            model_name='amenity',
            name='studio',
            field=models.ManyToManyField(related_name='amenities', to='studios.studio'),
        ),
    ]
