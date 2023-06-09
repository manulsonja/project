# Generated by Django 4.2 on 2023-04-09 10:00

from django.conf import settings
import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import tinymce.models
import touren.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tour',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('poly', django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(11, 47), srid=4326)),
                ('tourtype', models.CharField(editable=False, max_length=30)),
                ('title', models.CharField(max_length=30)),
                ('subtitle', models.CharField(max_length=100)),
                ('text', tinymce.models.HTMLField()),
                ('image', models.ImageField(default='tour/default.jpg', upload_to=touren.models.upload_to, verbose_name='Image')),
                ('published', models.DateTimeField(default=django.utils.timezone.now)),
                ('status', models.CharField(choices=[('draft', 'Draft'), ('published', 'Published')], default='published', max_length=10)),
                ('rating', models.CharField(choices=[('1', '1'), ('2', '2'), ('3', '3'), ('4', '4'), ('5', '5')], default='1', max_length=1)),
                ('slug', models.SlugField(max_length=250, unique_for_date='published')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tour_posts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-published',),
            },
        ),
        migrations.CreateModel(
            name='HikeAndFly',
            fields=[
                ('tour_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='touren.tour')),
            ],
            bases=('touren.tour',),
        ),
        migrations.CreateModel(
            name='Hochtour',
            fields=[
                ('tour_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='touren.tour')),
            ],
            bases=('touren.tour',),
        ),
        migrations.CreateModel(
            name='Klettertour',
            fields=[
                ('tour_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='touren.tour')),
                ('climbing_grades', models.IntegerField(choices=[(0, '1'), (1, '1+'), (2, '2-'), (3, '2'), (4, '2+'), (5, '3-'), (6, '3'), (7, '3+'), (8, '4-'), (9, '4'), (10, '4+'), (11, '5-'), (12, '5'), (13, '5+'), (14, '6-'), (15, '6'), (16, '6+'), (17, '7-'), (18, '7'), (19, '7+'), (20, '8-'), (21, '8'), (22, '8+'), (23, '9-'), (24, '9'), (25, '9+')], default=1)),
                ('protection', models.IntegerField(choices=[(0, 'alpin'), (1, 'mittel'), (2, 'gut'), (3, 'sehr gut')], default=3)),
                ('topo', models.ImageField(default='topo/default.jpg', upload_to=touren.models.upload_to, verbose_name='topo')),
            ],
            bases=('touren.tour',),
        ),
        migrations.CreateModel(
            name='Skitour',
            fields=[
                ('tour_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='touren.tour')),
            ],
            bases=('touren.tour',),
        ),
        migrations.CreateModel(
            name='Wandern',
            fields=[
                ('tour_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='touren.tour')),
            ],
            bases=('touren.tour',),
        ),
    ]
