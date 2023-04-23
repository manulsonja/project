from rest_framework import serializers
from pictures.contrib.rest_framework import PictureField
from mountain_huts.models import MountainHut
from users.serializers import AuthorSerializer
from touren.serializers import PictureSerializer

class HutSerializer(serializers.ModelSerializer):
        gallery = serializers.SerializerMethodField()
        image = PictureField()
        author = serializers.SerializerMethodField()

        def get_author(self,obj):
               author = obj.author
               return AuthorSerializer(author).data
   
        def get_gallery(self,obj):
                return PictureSerializer(obj.gallery.all(), many=True).data 
        class Meta:
                fields = ('id', 'name', 'position','image','text','hut_type','rating','slug','subtitle',
                'telephone','website','email','slug','gallery','author')
                model = MountainHut