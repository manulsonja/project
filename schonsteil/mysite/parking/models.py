from django.contrib.gis.db import models
from pictures.models import PictureField
from django.utils.text import slugify
from django.utils import timezone

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
    published = models.DateTimeField(default=timezone.now)
   
    parkingtype = models.CharField(max_length=20, choices=parkingtype, default='parkplatz')
    slug = models.SlugField(max_length=250, unique_for_date='published', editable=False, null=True)
    def __str__(self):
        return self.name
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)