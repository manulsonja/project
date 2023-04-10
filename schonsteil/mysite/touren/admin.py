from xml.dom import HierarchyRequestErr
from django.contrib import admin
from .models import *


class WandernAdmin(admin.ModelAdmin):
    model = Wandern
    readonly_fields=('track',)
      
# Register your models here.
admin.site.register(Klettertour)
admin.site.register(Skitour)
admin.site.register(Wandern, WandernAdmin)
admin.site.register(HikeAndFly)
admin.site.register(Hochtour)


