from .serializers import *
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from parking.models import Parking


class ViewParking(viewsets.ModelViewSet):
    queryset = Parking.objects.all()
    serializer_class = ParkingSerializer
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Parking, slug=item)
    