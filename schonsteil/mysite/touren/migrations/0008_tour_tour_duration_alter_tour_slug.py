# Generated by Django 4.2 on 2023-04-10 19:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('touren', '0007_alter_tour_track'),
    ]

    operations = [
        migrations.AddField(
            model_name='tour',
            name='tour_duration',
            field=models.DurationField(null=True),
        ),
        migrations.AlterField(
            model_name='tour',
            name='slug',
            field=models.SlugField(editable=False, max_length=250, unique_for_date='published'),
        ),
    ]
