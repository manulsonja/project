# Generated by Django 4.2 on 2023-04-24 21:00

from django.db import migrations, models
import django.db.models.deletion
import pictures.models
import touren.models


class Migration(migrations.Migration):

    dependencies = [
        ('touren', '0007_alter_tour_season'),
    ]

    operations = [
        migrations.CreateModel(
            name='Region',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True)),
                ('image', pictures.models.PictureField(aspect_ratios=['16/9'], breakpoints={'l': 1200, 'm': 992, 's': 768, 'xl': 1400, 'xs': 576}, container_width=1200, default='tour/default.jpg', file_types=['JPEG'], grid_columns=12, pixel_densities=[1, 2], upload_to=touren.models.upload_to, verbose_name='Image')),
                ('parent', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='regionen', to='touren.tour')),
            ],
        ),
    ]
