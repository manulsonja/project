from xml.dom import HierarchyRequestErr
from django.contrib import admin
from .models import *

class PhotoAdmin(admin.StackedInline):
    model = Image







class WandernAdmin(admin.ModelAdmin):
    model = Wandern
    exclude=('track',)
    readonly_fields=('distance','geojson_track',)
    inlines = [PhotoAdmin]


# Register your models here.
admin.site.register(Klettertour)
admin.site.register(Skitour)
admin.site.register(Wandern, WandernAdmin)
admin.site.register(HikeAndFly)
admin.site.register(Hochtour)


