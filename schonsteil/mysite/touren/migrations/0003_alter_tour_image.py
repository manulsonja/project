# Generated by Django 4.2 on 2023-04-17 06:59

from django.db import migrations
import pictures.models
import touren.models


class Migration(migrations.Migration):

    dependencies = [
        ('touren', '0002_remove_tour_poly_tour_difficulty_tour_distance_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tour',
            name='image',
            field=pictures.models.PictureField(aspect_ratios=['16/9'], breakpoints={'l': 1200, 'm': 992, 's': 768, 'xl': 1400, 'xs': 576}, container_width=1200, default='tour/default.jpg', file_types=['JPEG'], grid_columns=12, pixel_densities=[1, 2], upload_to=touren.models.upload_to, verbose_name='Image'),
        ),
    ]
