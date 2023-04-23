from .serializers import *
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

class ViewHut(viewsets.ModelViewSet):
    queryset = MountainHut.objects.all()
    serializer_class = HutSerializer
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(MountainHut, slug=item)
    