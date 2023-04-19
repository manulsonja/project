from gc import get_objects
from urllib import request, response
from rest_framework import generics
from touren.models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from ast import literal_eval
from itertools import chain
from rest_framework import filters
from mountain_huts.models import MountainHut
from parking.models import Parking

class PictureField(viewsets.ModelViewSet):
    queryset = Tour.tourobjects.all()
    serializer_class = PictureSerializer
    
class ViewHut(viewsets.ModelViewSet):
    queryset = MountainHut.objects.all()
    serializer_class = HutSerializer
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(MountainHut, slug=item)
class ViewParking(viewsets.ModelViewSet):
    queryset = Parking.objects.all()
    serializer_class = ParkingSerializer
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Parking, slug=item)
class ViewTouren(viewsets.ModelViewSet):
    filter_backends = [filters.SearchFilter]
    serializer_class = TourSerializer
    search_fields = ["^title"]

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Tour, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        try:
            diff = self.request.query_params.get('diff', None)
            diff = diff.split(',')
            tourtype = self.request.query_params.get('tourtypes', None)  
            tourtype = tourtype.split(',')
            if tourtype==[""] and diff == [""]:
                return
            if tourtype!=[""]:  
                qs = Tour.tourobjects.filter(tourtype__in=tourtype)
            if diff!=[""]:
                qs = qs.filter(difficulty__in=diff)

        except:
            qs = Tour.tourobjects.all()
            print('exception api/views.py line 54 Probably insufficient or no query params provided but required for filtering in django')
        return qs

class ViewHochtouren(viewsets.ModelViewSet):
    queryset = Hochtour.tourobjects.all()
    serializer_class = HochtourSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Hochtour, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        return Hochtour.objects.all()

class ViewWandern(viewsets.ModelViewSet):

    queryset = Wandern.tourobjects.all()
    serializer_class = WandernSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Wandern, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        return Wandern.objects.all()

class ViewSkitour(viewsets.ModelViewSet):

    queryset = Skitour.tourobjects.all()
    serializer_class = SkitourSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Skitour, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        return Skitour.objects.all()

class ViewHaF(viewsets.ModelViewSet):

    queryset = HikeAndFly.tourobjects.all()
    serializer_class = HikeAndFlySerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(HikeAndFly, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        return HikeAndFly.objects.all()


class ViewKlettertour(viewsets.ModelViewSet):

    queryset = Klettertour.tourobjects.all()
    serializer_class = KlettertourSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Klettertour, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        return Klettertour.objects.all()


