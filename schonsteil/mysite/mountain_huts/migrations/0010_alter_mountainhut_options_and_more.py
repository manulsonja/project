# Generated by Django 4.2 on 2023-04-30 15:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mountain_huts', '0009_alter_mountainhut_subtitle'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='mountainhut',
            options={'ordering': ('-created',)},
        ),
        migrations.RenameField(
            model_name='mountainhut',
            old_name='published',
            new_name='created',
        ),
    ]
