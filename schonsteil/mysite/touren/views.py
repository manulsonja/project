from touren.models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework import filters
from django.shortcuts import get_object_or_404
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, BasePermission, IsAdminUser, DjangoModelPermissions
from rest_framework import filters
from rest_framework import pagination
from django.db.models import Max


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

        return response
    
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Tour, slug=item)

    # Define Custom Queryset
    def get_queryset(self):
        try:
            diff = self.request.query_params.get('diff', None)
            tourtype = self.request.query_params.get('tourtypes', None) 
            distance_touple =  self.request.query_params.get('dist', None)

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
            #self.distance_slider = qs.aggregate(Max('distance')).get('distance__max')
            self.duration_slider = qs.aggregate(Max('tour_duration')).get('tour_duration__max')
            if distance_touple:
                distance_array = distance_touple.split(',')
                lower = distance_array[0]
                upper = distance_array[1]  
                       
                qs = qs.filter(distance__gte=lower, distance__lte=upper)

        except:
            print('exception api/views.py line 45 Probably insufficient or no query params provided but required for filtering in django')
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
    