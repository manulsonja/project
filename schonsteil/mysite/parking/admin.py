from django.contrib import admin
from .models import Parking, ParkingGallery

class GalleryAdmin(admin.StackedInline):
    model = ParkingGallery

class ParkingAdmin(admin.ModelAdmin):
    model = Parking
    inlines = [GalleryAdmin]

admin.site.register(Parking, ParkingAdmin)  

