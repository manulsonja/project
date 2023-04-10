from email.policy import default
from tinymce import models as tinymce_models
from django.contrib.auth.models import User
from django.utils import timezone
from users.models import NewUser 
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from utils.parser.parse import parse_gpx
from django.conf import settings
from django.utils.text import slugify

def upload_to(instance, filename):
    return 'posts/{filename}'.format(filename=filename)

class Tour(models.Model):

    gpxfile = models.FileField(upload_to='files', null=True)
    track = models.LineStringField(null=True, dim=3)
    tourtype=models.CharField(max_length=30, editable=False)
    class TourObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset() .filter(status='published')
    options = (
        ('draft', 'Draft'),
        ('published', 'Published'),)
    rating_choices = [
        ("1","1"),
        ("2","2"),
        ("3","3"),
        ("4","4"),
        ("5","5"),]
   
    title = models.CharField(max_length=30)
    subtitle = models.CharField(max_length=100)
    text =  tinymce_models.HTMLField()
    image = models.ImageField("Image", upload_to=upload_to, default='tour/default.jpg')
    published = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(
        NewUser, on_delete=models.CASCADE, related_name='tour_posts',) 
    status = models.CharField(
        max_length=10, choices=options, default='published')
    rating = models.CharField(
        max_length=1,
        choices=rating_choices,
        default='1',)

    slug = models.SlugField(max_length=250, unique_for_date='published', editable=False)
    objects = models.Manager()  # default manager
    tourobjects = TourObjects()  # custom manager

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

   
    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    


class Klettertour(Tour):
    protection_choices=[(0,"alpin"),(1,"mittel"),(2,"gut"),(3,"sehr gut")]
    grades_choices=[("1",0),("1+",1),
                    ("2-",2),("2",3),("2+",4),
                    ("3-",5),("3",6),("3+",7),
                    ("4-",8),("4",9),("4+",10),
                    ("5-",11),("5",12),("5+",13),
                    ("6-",14),("6",15),("6+",16),
                    ("7-",17),("7",18),("7+",19),
                    ("8-",20),("8",21),("8+",22),
                    ("9-",23),("9",24),("9+",25)

                   ]
    g_choices = []  
    for grade in grades_choices:
        g_choices.append((grade[1],grade[0]))

    climbing_grades=models.IntegerField(
        choices=g_choices,
        default=1,
    )

    protection=models.IntegerField(
        choices=protection_choices,
        default=3)

    topo = models.ImageField("topo", upload_to=upload_to, default='topo/default.jpg')
    def save(self, *args, **kwargs):
        file_url = self.gpxfile
        ls = parse_gpx(file_url)
        self.track = ls
        self.tourtype = "Klettern"
        super().save(*args, **kwargs)

class Skitour(Tour):
    def save(self, *args, **kwargs):
        self.tourtype = "Schitour"
        super().save(*args, **kwargs)

class Hochtour(Tour):
    def save(self, *args, **kwargs):
        self.tourtype = "Hochtour"
        super().save(*args, **kwargs)

class Wandern(Tour):
    def save(self, *args, **kwargs):
        file_url = self.gpxfile
        ls = parse_gpx(file_url)
        self.track = ls
        self.tourtype = "Klettern"
        self.tourtype = "Wandern"
        super().save(*args, **kwargs)

class HikeAndFly(Tour):
    def save(self, *args, **kwargs):
        self.tourtype = "Hike and Fly"
        super().save(*args, **kwargs)


    

