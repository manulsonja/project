# Generated by Django 4.2 on 2023-04-18 14:11

from django.db import migrations, models
import django.db.models.deletion
import mountain_huts.models
import pictures.models


class Migration(migrations.Migration):

    dependencies = [
        ('mountain_huts', '0005_delete_hutgallery'),
    ]

    operations = [
        migrations.CreateModel(
            name='HutGallery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', pictures.models.PictureField(aspect_ratios=['16/9'], breakpoints={'l': 1200, 'm': 992, 's': 768, 'xl': 1400, 'xs': 576}, container_width=1200, default='tour/default.jpg', file_types=['JPEG'], grid_columns=12, pixel_densities=[1, 2], upload_to=mountain_huts.models.upload_to, verbose_name='Image')),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gallery', to='mountain_huts.mountainhut')),
            ],
        ),
    ]
