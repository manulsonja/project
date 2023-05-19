from xml.dom import HierarchyRequestErr
from django.contrib import admin
from .models import *

class PhotoAdmin(admin.StackedInline):
    model = Image

class WandernAdmin(admin.ModelAdmin):
    model = Wandern
    exclude=('track',)
    readonly_fields=('distance','geojson_track','elevation_gain',)
    inlines = [PhotoAdmin]
    fields = (
        ('title','rating',),
        ('subtitle','tour_duration'),
        'gpxfile',
        'image',
        ('fitness_difficulty','tech_difficulty', 'region'),
        ('season', 'offseason'),
        'text',
        'author',
    )

class SkitourAdmin(WandernAdmin):
    model = Skitour

class HikeAndFlyAdmin(WandernAdmin):
    model = HikeAndFly
 
class KlettertourAdmin(WandernAdmin):
    model = Klettertour
    fields = (
        ('title','rating',),
        ('subtitle','tour_duration'),
        'gpxfile',
        'image',
        ('climbing_grade','protection', 'region'),
        ('season', 'offseason'),
        'text',
        'author',
    )

class HochtourAdmin(WandernAdmin):
    model = Hochtour

admin.site.register(Klettertour, KlettertourAdmin)
admin.site.register(Skitour,SkitourAdmin)
admin.site.register(Wandern, WandernAdmin)
admin.site.register(HikeAndFly, HikeAndFlyAdmin)
admin.site.register(Hochtour, HochtourAdmin)
admin.site.register(Image)




