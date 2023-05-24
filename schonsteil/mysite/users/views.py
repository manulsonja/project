from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
#from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .serializers import UserCreateSerializer, ProfileDataSerializer, GuestProfileSerializer, AuthorProfileSerializer
from .models import NewUser
from rest_framework.response import Response

class ProfileView(APIView):
    def get(self, request, uid,  format=None):
        authuid = request.user.pk 

        print(authuid)
        print(uid)

        user = NewUser.objects.get(pk=uid)
        if authuid == uid:
            resp = self.get_auth_profile(user)
        else:
            if user.is_staff is True:
                resp = self.get_author_profile(user)
            else:
                resp = self.get_guest_profile(user)
                    
        """       except:
            resp = Response("User nicht gefunden", status=404) """
            
        return resp

    def get_auth_profile(self, user):
        return Response(ProfileDataSerializer(user).data)
    
    def get_guest_profile(self, user): 
        return Response(GuestProfileSerializer(user).data)
    def get_author_profile(self, user): 
        return Response(AuthorProfileSerializer(user).data)
           
            

class CustomUserCreate(APIView):
    print('customusercrateview')
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
