# Generated by Django 4.2 on 2023-04-18 13:53

from django.db import migrations, models
import mountain_huts.models
import pictures.models


class Migration(migrations.Migration):

    dependencies = [
        ('mountain_huts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='mountainhut',
            name='slug',
            field=models.SlugField(editable=False, max_length=250, null=True, unique_for_date='published'),
        ),
        migrations.AlterField(
            model_name='mountainhut',
            name='image',
            field=pictures.models.PictureField(aspect_ratios=[None], breakpoints={'l': 1200, 'm': 992, 's': 768, 'xl': 1400, 'xs': 576}, container_width=1200, default='tour/default.jpg', file_types=['JPEG'], grid_columns=12, pixel_densities=[1, 2], upload_to=mountain_huts.models.upload_to, verbose_name='Image'),
        ),
    ]
