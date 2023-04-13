from django.contrib.gis.db import models
from tinymce import models as tinymce_models
from django.utils import timezone
from users.models import NewUser 


# Create your models here.
def upload_to(instance, filename):
    return 'huts/{filename}'.format(filename=filename)

class MountainHut(models.Model):
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
    image = models.ImageField("Image", upload_to=upload_to, default='tour/default.jpg')
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

    #slug = models.SlugField(max_length=250, unique_for_date='published', editable=False)
