from django.contrib.gis.db import models
from tinymce import models as tinymce_models
from django.utils import timezone
from users.models import NewUser 
from pictures.models import PictureField
from django.utils.text import slugify
from geography.models import Zone, Gebirge, Region

def upload_to(instance, filename):
    return 'huts/{filename}'.format(filename=filename)

class MountainHut(models.Model): 
    hut_type_options = (
        ('alm', 'Alm'),
        ('huette', 'Huette'),
        ('gasthof', 'Gasthof'),
        ('sonstige', 'Sonstige'),  
        )

    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),)
    rating_choices = [
        ("1","1"),
        ("2","2"),
        ("3","3"),
        ("4","4"),
        ("5","5"),]
    
    name = models.CharField(max_length=30)
    subtitle = models.CharField(max_length=150, blank=True, null=True)
    text =  tinymce_models.HTMLField(blank=True, null=True)
   
    telephone = models.CharField(max_length=20, blank=True, null=True)
    email = models.CharField(max_length=50,blank=True, null=True)  
    website = models.CharField(max_length=50, blank=True, null=True)
    # Oeffnungszeiten
    position = models.PointField(blank=True, null=True)   
    image = PictureField("Image", upload_to=upload_to, default='tour/default.jpg', aspect_ratios=["16/9"])
    created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, related_name='hut_posts') 
    status = models.CharField(
        max_length=10, choices=options, default='published')
    
    hut_type = models.CharField(
        max_length=10, choices=hut_type_options, default='Huette')
    rating = models.CharField(
        max_length=1,
        choices=rating_choices,
        default='1',
        blank=True)
    
    zone = models.ForeignKey(Zone,on_delete=models.CASCADE,related_name="huts", null=True)
    region = models.ForeignKey(Region,on_delete=models.CASCADE,related_name="huts", null=True)
    gebirge = models.ForeignKey(Gebirge,on_delete=models.CASCADE,related_name="huts", null=True)


    slug = models.SlugField(max_length=250, unique_for_date='created', editable=False, null=True)
    class Meta:
        ordering = ('-created',)
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class HutGallery(models.Model):
    image = PictureField("Image", upload_to=upload_to, default='tour/default.jpg',  aspect_ratios=["16/9"]) 
    parent = models.ForeignKey(MountainHut, on_delete=models.CASCADE, related_name="gallery")
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

