from xml.dom import HierarchyRequestErr
from django.contrib import admin
from .models import *

class PhotoAdmin(admin.StackedInline):
    model = HutGallery

class MountainHutAdmin(admin.ModelAdmin):
    model = MountainHut
    inlines = [PhotoAdmin]

admin.site.register(MountainHut, MountainHutAdmin)
