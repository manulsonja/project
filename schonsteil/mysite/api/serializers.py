from rest_framework import serializers
from touren.models import Tour, Hochtour, Wandern, Klettertour, HikeAndFly, Skitour
import json
from shapely import wkt 
from pictures.contrib.rest_framework import PictureField
from mountain_huts.models import MountainHut
from parking.models import Parking
from blog.models import BlogArticle



class ArticleImageSerializer(serializers.Serializer):
        profilepic=PictureField()
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
                'track','starting_pnt','subtitle','tour_duration','distance','difficulty','season')
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
                photos = obj.author.profile
                return ArticleImageSerializer(photos).data

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
        gallery = serializers.SerializerMethodField()
        image = PictureField()
        author_name = serializers.SerializerMethodField()
        profilepic = serializers.SerializerMethodField()  

        def get_author_name(self,obj):
               name = obj.author.first_name
               return name
        def get_profilepic(self,obj):
               pic = obj.author.profile
               return ArticleImageSerializer(pic).data
  
        def get_gallery(self,obj):
                return PictureSerializer(obj.gallery.all(), many=True).data 
        class Meta:
                fields = ('id', 'name', 'position','image','text','hut_type','rating','slug','subtitle',
                'telephone','website','email','slug','gallery','author_name','profilepic')
                model = MountainHut

class ArticleSerializer(serializers.ModelSerializer):
        image = PictureField()
        author_name = serializers.SerializerMethodField()
        profilepic = serializers.SerializerMethodField()
        def get_profilepic(self,obj):
               profilepic = obj.author.profile
               return ArticleImageSerializer(profilepic).data
               
        def get_author_name(self,obj):
               return obj.author.first_name
        class Meta:
                fields = ('id', 'title', 'image','slug','category','author','text','subtitle','author_name','profilepic')
                model = BlogArticle

class LandingPageSerializer(serializers.Serializer):

        primary_feature_article_pk = serializers.SerializerMethodField()
        def get_primary_feature_article_pk(self, obj):
               return ArticleSerializer(obj.primary_feature_article).data
        
class ParkingSerializer(serializers.ModelSerializer):
        image = PictureField()
        class Meta:
                fields = ('parkingtype', 'name', 'position','image','toilet','fees','slug','text')
                model = Parking
