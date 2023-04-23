from django.contrib.gis.db import models
from pictures.models import PictureField
from django.utils.text import slugify
from django.utils import timezone
from tinymce import models as tinymce_models

def upload_to(instance, filename):
    return 'huts/{filename}'.format(filename=filename)


class Parking(models.Model): 
    parkingtype = (
    ('parkplatz', 'Parkplatz'),
    ('haltestelle', 'Haltestelle'),
    ('stellplatz', 'Stellplatz'),
    ('sonstige', 'Sonstige'),  )
    toilet = (
    (True, 'Ja'),
    (False, 'Nein'),  )
    text = tinymce_models.HTMLField(null=True)
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
    

class ParkingGallery(models.Model):
    image = PictureField("Image", upload_to=upload_to, default='tour/default.jpg',  aspect_ratios=["16/9"]) 
    parent = models.ForeignKey(Parking, on_delete=models.CASCADE, related_name="gallery")
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

