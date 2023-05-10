from touren.models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework import filters
from rest_framework import pagination
from django.db.models import Max
from rest_framework.response import Response
from pprint import pprint
import json
from django.contrib.gis.geos import Polygon
from django.contrib.gis.geos import Point

class CustomPagination(pagination.CursorPagination):
    page_size = 12
    cursor_query_param = 'c'
    ordering = '-created'

class ViewTouren(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    filter_backends = [filters.SearchFilter]
    serializer_class = TourSerializer
    search_fields = ["^title"]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        response.data['duration_slider'] = self.duration_slider
        response.data['distance_slider'] = self.distance_slider
        response.data['elevation_slider'] = self.elevation_slider
        return response
    
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Tour, slug=item)

    # Define Custom Queryset
        
    def create(self, request):
        qs = self.get_queryset()
        try:
            ne = request.data['mapbounds']['_northEast']
            sw = request.data['mapbounds']['_southWest']

            west = float(sw['lng'])
            east = float(ne['lng'])

            north = float(ne['lat'])
            south = float(sw['lat'])
  
            geom = Polygon(( (north, west), (north, east), (south, east),(south, west),(north, west)))
            print("geom")

            qs = qs.filter(track__intersects=geom)
            
        except:
            pass
        results = []
        
        for q in qs:
            entry = TourSerializer(q).data
            results.append(entry)
        resp = {
            "results": results
        }
        return Response(resp)

    def get_queryset(self):
        try:
            diff = self.request.query_params.get('diff', None)
            tourtype = self.request.query_params.get('tourtypes', None) 
            distance_touple =  self.request.query_params.get('dist', None)
            duration_touple =  self.request.query_params.get('dur', None)
            elevation_touple =  self.request.query_params.get('ele', None)
  

            if diff:
                diff = diff.split(',')
            if tourtype:
                tourtype = tourtype.split(',')
            
            qs = Tour.tourobjects.all()
            if diff:
                qs = qs.filter(difficulty__in=diff)
            if tourtype:
                qs = qs.filter(tourtype__in=tourtype)
            self.distance_slider = qs.aggregate(Max('distance')).get('distance__max')
            self.duration_slider = qs.aggregate(Max('tour_duration')).get('tour_duration__max')
            self.elevation_slider = qs.aggregate(Max('elevation_gain')).get('elevation_gain__max')
          
            if distance_touple:
                distance_array = distance_touple.split(',')
                lower = distance_array[0]
                upper = distance_array[1]              
                qs = qs.filter(distance__gte=lower, distance__lte=upper)
            
            if duration_touple:
                duration_array = duration_touple.split(',')
                lower = duration_array[0]
                upper = duration_array[1]  
                qs = qs.filter(tour_duration__gte=lower, tour_duration__lte=upper)
            if elevation_touple:
                elevation_array = elevation_touple.split(',')
                lower = elevation_array[0]
                upper = elevation_array[1]  
                print(lower)
                print(upper)
                qs = qs.filter(elevation_gain__gte=lower, elevation_gain__lte=upper)
        except:
            print('exception api/views.py line 72 Probably insufficient or no query params provided but required for filtering in django')
            pass 
        
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
    