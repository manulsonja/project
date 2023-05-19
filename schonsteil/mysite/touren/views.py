from touren.models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework import filters
from rest_framework import pagination
from django.db.models import Max
from django.contrib.gis.geoip2 import GeoIP2
from utils.parser.parse import leafletBoundsToPoly
from rest_framework.decorators import action
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from datetime import timedelta

class CustomPagination(pagination.CursorPagination):
    page_size = 12
    cursor_query_param = 'c'
    ordering = '-created'
    
class SearchPagination(pagination.CursorPagination):
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

    @action(methods=['post'], detail=False, permission_classes=[AllowAny], url_path='tour-filter') 
    def filter(self, request):
        self.tourtypes = request.data.get('tourtypes', None)
        self.diff = request.data.get('difficulty', None)
        self.q = request.data.get('searchstring', None)
        # if filters exist get them
        self.dist = request.data.get('distance', None)
        self.dur = request.data.get('duration', None)
        self.ele = request.data.get('elevation', None)

        qs = self.get_queryset()

   
        if self.q:
            """  self.pagination_class = SearchPagination
            vector = SearchVector('title','subtitle', weight="A") + SearchVector('text', weight="B")
            query = SearchQuery(q) """
            qs = qs.filter(title__icontains=self.q)

        result_page = self.paginate_queryset(qs)
        serializer = TourSerializer(result_page, many=True)
        response =  self.get_paginated_response(serializer.data)
        response.data['duration_slider'] = self.duration_slider
        response.data['distance_slider'] = self.distance_slider
        response.data['elevation_slider'] = self.elevation_slider
        return response 
    @action(methods=['post'], detail=False, permission_classes=[AllowAny], url_path='filter') 
    def filtered(self, request):
        self.tourtypes = request.data['tourtypes']
        self.diff = request.data['difficulty']
        self.bounds = request.data['mapbounds']
        self.q = request.data['searchstring']
        # if filters exist get them
        self.dist = request.data.get('distance', None)
        self.dur = request.data.get('duration', None)
        self.ele = request.data.get('elevation', None)

        qs = self.get_queryset()

   
        try:
            geom = leafletBoundsToPoly(bounds)
            qs = qs.filter(track__intersects=geom)
        
        except:
            pass
        if self.q:
            qs = qs.filter(title__icontains=self.q)
            pass
            """ self.pagination_class = SearchPagination
            vector = SearchVector('title','subtitle', weight="A") + SearchVector('text', weight="B")
            query = SearchQuery(q)
            qs = qs.annotate(rank=SearchRank(vector, query, cover_density=True)).order_by('-rank') """

        result_page = self.paginate_queryset(qs)
        serializer = TourSerializer(result_page, many=True)
        response =  self.get_paginated_response(serializer.data)
        response.data['duration_slider'] = self.duration_slider
        response.data['distance_slider'] = self.distance_slider
        response.data['elevation_slider'] = self.elevation_slider
        return response 
    def get_queryset(self):
        print('getting queryset')
  
         
        qs = Tour.tourobjects.all()
        if self.diff:
            qs = qs.filter(difficulty__in=self.diff)
        if self.tourtypes:
            qs = qs.filter(tourtype__in=self.tourtypes)
        self.distance_slider = qs.aggregate(Max('distance')).get('distance__max')
        self.duration_slider = qs.aggregate(Max('tour_duration')).get('tour_duration__max')
        self.elevation_slider = qs.aggregate(Max('elevation_gain')).get('elevation_gain__max')
          
        qs = self.apply_filters(qs)

        
        return qs
    
    def apply_filters(self, qs):
            if self.dist:
                lower = self.dist[0]
                upper = self.dist[1] 
                qs = qs.filter(distance__gte=lower, distance__lte=upper)
            
            if self.dur:
                lower = timedelta(minutes=self.dur[0])
                upper = timedelta(minutes=self.dur[1]) 
                qs = qs.filter(tour_duration__gte=lower, tour_duration__lte=upper)
            if self.ele:
                lower = self.ele[0]
                upper = self.ele[1]  
                qs = qs.filter(elevation_gain__gte=lower, elevation_gain__lte=upper)

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
    