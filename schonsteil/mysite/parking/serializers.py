from rest_framework import serializers
from pictures.contrib.rest_framework import PictureField
from .models import Parking
     
class ParkingSerializer(serializers.ModelSerializer):
        image = PictureField()
        class Meta:
                fields = ('parkingtype', 'name', 'position','image','toilet','fees','slug','text')
                model = Parking
