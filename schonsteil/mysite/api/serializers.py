from rest_framework import serializers
from touren.models import Tour, Hochtour, Wandern, Klettertour, HikeAndFly, Skitour
import json
from shapely import wkt 
from pictures.contrib.rest_framework import PictureField
from mountain_huts.models import MountainHut
from parking.models import Parking

class PictureSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, allow_blank=True, max_length=100)
    image = PictureField()

class TourSerializer(serializers.ModelSerializer):
        image = PictureField()
        starting_pnt = serializers.SerializerMethodField()
        def get_starting_pnt(self, obj):
                ls = obj.track
                start = ls[0]
                return start
        class Meta:
                fields = ('id', 'title', 'text', 'tourtype', 'rating','author', 'published','image','slug',
                'track','starting_pnt','subtitle','tour_duration','distance','difficulty')
                model = Tour

#FIELDS FOR DETAIL VIEW WITHOUT SPECIFICS -- BELONGS TO TOURDETAILSERIALIZER
GLOBAL_FIELDS = ('id', 'title', 'text', 'tourtype', 'rating','author', 'published',
        'profilepic','profile_pk','author_name','image','slug','geojson_track','starting_pnt','photoalbum','tour_duration','distance',)
class TourDetailSerializer(TourSerializer):
        author_name = serializers.SerializerMethodField()
        profilepic = serializers.SerializerMethodField()
        profile_pk = serializers.SerializerMethodField()
        photoalbum = serializers.SerializerMethodField()
        image = PictureField()
      
        def get_photoalbum(self,obj):
                return PictureSerializer(obj.album.all(), many=True).data 
        def get_author_name(self,obj):
                return obj.author.user_name
        def get_profilepic(self,obj):
                request = self.context.get('request')
                photo_url = obj.author.profile.profilepic.url
                return request.build_absolute_uri(photo_url)
        def get_profile_pk(self,obj):
                return obj.author.profile.pk
    
class HochtourSerializer(TourDetailSerializer):
     class Meta:
        fields = GLOBAL_FIELDS
        model = Hochtour

class WandernSerializer(TourDetailSerializer):
        class Meta:
                fields = GLOBAL_FIELDS
                model = Wandern

class KlettertourSerializer(TourDetailSerializer):
     class Meta:
        fields = GLOBAL_FIELDS
        model = Klettertour

class HikeAndFlySerializer(TourDetailSerializer):
     class Meta:
        fields = GLOBAL_FIELDS
        model = HikeAndFly

class SkitourSerializer(TourDetailSerializer):
     class Meta:
        fields = GLOBAL_FIELDS
        model = Skitour

class HutSerializer(serializers.ModelSerializer):
        image = PictureField()
        class Meta:
                fields = ('id', 'name', 'position','image','text','hut_type','rating','slug','subtitle',
                'telephone','website','email','slug')
                model = MountainHut

class ParkingSerializer(serializers.ModelSerializer):
        image = PictureField()
        class Meta:
                fields = ('parkingtype', 'name', 'position','image','toilet','fees','slug',)
                model = Parking
