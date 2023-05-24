from rest_framework import serializers
from users.models import NewUser
from djoser.serializers import UserCreateSerializer
from pictures.contrib.rest_framework import PictureField
from blog.models import BlogArticle
from touren.models import Tour
""" 
class CustomUserSerializer(serializers.ModelSerializer):
    Currently unused in preference of the below.
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
 """

class UserCreateSerializer(UserCreateSerializer):
    print('usercreateserializer')
    class Meta(UserCreateSerializer.Meta):
        model = NewUser
        fields = ('id', 'email', 'first_name', 'last_name', 'password', 'user_name')


class ProfileImageSerializer(serializers.Serializer):
        about_short = serializers.CharField()
        profilepic=PictureField()

     

class AuthorSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    aid = serializers.SerializerMethodField()
    def get_aid(self, obj):
         return obj.pk
    def get_profile(self, obj):
            photos = obj.profile
            return ProfileImageSerializer(photos).data     
    class Meta:
        fields = ('first_name', 'last_name', 'profile', 'aid')
        model = NewUser



class ProfileDataSerializer(serializers.ModelSerializer):
    auth_type = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    def get_auth_type(self,obj):
         return 'owner'

    def get_profile(self, obj):
            
            photos = obj.profile
            return ProfileImageSerializer(photos).data     
    class Meta:
        fields = ('first_name', 'last_name', 'profile', 'user_name', 'auth_type')
        model = NewUser

class GuestProfileSerializer(serializers.ModelSerializer):
    auth_type = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    def get_auth_type(self,obj):
         return 'guest'
    def get_profile(self, obj):
            photos = obj.profile
            return ProfileImageSerializer(photos).data     
    class Meta:
        fields = ('profile', 'user_name', 'auth_type')
        model = NewUser



class ArticleStubSerializer(serializers.ModelSerializer):
      class Meta:
        fields = ('title', 'image', 'subtitle','slug')
        model = BlogArticle
class TourStubSerializer(serializers.ModelSerializer):
      class Meta:
        fields = ('title', 'subtitle','slug','tourtype')
        model = Tour
     
     
class AuthorProfileSerializer(serializers.ModelSerializer):
    auth_type = serializers.SerializerMethodField()
    profile = serializers.SerializerMethodField()
    articles = serializers.SerializerMethodField()
    tours = serializers.SerializerMethodField()
    def get_tours(self,obj):
         tours = obj.tour_posts.all()
         return TourStubSerializer(tours, many=True).data
         
    def get_articles(self,obj):
         arts = obj.articles.all()
         return ArticleStubSerializer(arts, many=True).data
    def get_auth_type(self,obj):
         return 'author_profile'
    def get_profile(self, obj):
            photos = obj.profile
            return ProfileImageSerializer(photos).data     
    class Meta:
        fields = ('profile', 'user_name', 'auth_type', 'articles', 'tours')
        model = NewUser

     