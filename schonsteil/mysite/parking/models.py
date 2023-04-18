from django.contrib.gis.db import models
from pictures.models import PictureField

# Create your models here.


class Parking(models.Model): 
    parkingtype = (
    ('parkplatz', 'Parkplatz'),
    ('haltestelle', 'Haltestelle'),
    ('stellplatz', 'Stellplatz'),
    ('sonstige', 'Sonstige'),  )
    toilet = (
    (True, 'Ja'),
    (False, 'Nein'),  )
    image = PictureField(aspect_ratios=["16/9"])
    toilet = models.BooleanField(null=True)
    fees = models.FloatField(null=True)
    name = models.CharField(max_length=30)   
    position = models.PointField(null=True)   
    parkingtype = models.CharField(max_length=20, choices=parkingtype, default='parkplatz')
