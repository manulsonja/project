# Generated by Django 4.2 on 2023-05-10 06:55

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('mountain_huts', '0019_remove_mountainhut_zone_mountainhut_overnight'),
    ]

    operations = [
        migrations.AddField(
            model_name='mountainhut',
            name='offseason',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('1', 'January'), ('2', 'February'), ('3', 'March'), ('4', 'April'), ('5', 'Mai'), ('6', 'June'), ('7', 'July'), ('8', 'August'), ('9', 'September'), ('10', 'Octobre'), ('11', 'November'), ('12', 'Decembre')], default=None, max_length=100),
        ),
        migrations.AddField(
            model_name='mountainhut',
            name='season',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('1', 'January'), ('2', 'February'), ('3', 'March'), ('4', 'April'), ('5', 'Mai'), ('6', 'June'), ('7', 'July'), ('8', 'August'), ('9', 'September'), ('10', 'Octobre'), ('11', 'November'), ('12', 'Decembre')], default=None, max_length=100),
        ),
    ]
