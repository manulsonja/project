# Generated by Django 4.2 on 2023-04-09 15:07

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('touren', '0003_remove_tour_poly_alter_tour_track'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tour',
            name='track',
        ),
        migrations.AddField(
            model_name='tour',
            name='geotrack',
            field=django.contrib.gis.db.models.fields.LineStringField(null=True, srid=4326),
        ),
    ]
