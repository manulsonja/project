from django.contrib.gis.db import models
from tinymce import models as tinymce_models
from django.utils import timezone
from users.models import NewUser 
from pictures.models import PictureField

def upload_to(instance, filename):
    return 'huts/{filename}'.format(filename=filename)

class MountainHut(models.Model): 
    subtitle = models.CharField(max_length=150, null=True)
    telephone = models.CharField(max_length=20, null=True)
    email = models.CharField(max_length=50,null=True)  
    website = models.CharField(max_length=50, null=True)
    # Oeffnungszeiten
    name = models.CharField(max_length=30)   
    position = models.PointField(null=True)   
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
   
    text =  tinymce_models.HTMLField()
    image = PictureField("Image", upload_to=upload_to, default='tour/default.jpg', aspect_ratios=["16/9"])
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, related_name='hut_posts',) 
    status = models.CharField(
        max_length=10, choices=options, default='published')
    
    hut_type = models.CharField(
        max_length=10, choices=hut_type_options, default='Huette')
    rating = models.CharField(
        max_length=1,
        choices=rating_choices,
        default='1',)
    slug = models.SlugField(max_length=250, unique_for_date='published', editable=False, null=True)
    class Meta:
        ordering = ('-published',)
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

class HutGallery(models.Model):
    image = PictureField("Image", upload_to=upload_to, default='tour/default.jpg',  aspect_ratios=["16/9"]) 
    parent = models.ForeignKey(MountainHut, on_delete=models.CASCADE, related_name="gallery")
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

