# Generated by Django 4.2 on 2023-04-18 13:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mountain_huts', '0002_mountainhut_slug_alter_mountainhut_image'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mountainhut',
            options={'ordering': ('-published',)},
        ),
    ]
