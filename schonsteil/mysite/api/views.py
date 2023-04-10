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

class ViewTouren(viewsets.ModelViewSet):

    serializer_class = TourSerializer
    permission_classes = [IsAuthenticated]
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Tour, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        params = self.request.query_params['tourtypes'].split(",")
        kt=haf=wd=st=ht  = Tour.objects.none()
        if "kt" in params:
            kt  = Klettertour.tourobjects.all()
        if "haf" in params:
            haf = HikeAndFly.tourobjects.all()
        if "wd" in params:
            wd  = Wandern.tourobjects.all()
        if "st" in params:
            st  = Skitour.tourobjects.all()
        if "ht" in params:
            ht  = Hochtour.tourobjects.all()
 
        return list(chain(kt,haf,wd,st,ht))

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


