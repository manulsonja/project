from rest_framework import serializers
from pictures.contrib.rest_framework import PictureField
from .models import Parking
from touren.serializers import PictureSerializer


class ParkingSerializer(serializers.ModelSerializer):        
        image = PictureField()
        gallery = serializers.SerializerMethodField()

        def get_gallery(self,obj):
                return PictureSerializer(obj.gallery.all(), many=True).data 
        class Meta:
                fields = ('parkingtype', 'name', 'position','image','toilet','fees','slug','text','gallery')
                model = Parking
