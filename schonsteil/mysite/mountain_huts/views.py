from .serializers import *
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework import pagination
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.contrib.postgres.search import TrigramDistance

class CustomPagination(pagination.CursorPagination):
    page_size = 30
    cursor_query_param = 'c'
    ordering = '-created'

class ViewHut(viewsets.ModelViewSet):
    queryset = MountainHut.hutobjects.all()
    serializer_class = HutSerializer
    pagination_class=CustomPagination

    @action(methods=['post'], detail=False, permission_classes=[AllowAny], url_path='filter') 
    def filtered(self, request):
        huttypes = request.data.get('huttype',None)
        q = request.data.get('searchstring', None)

        qs = MountainHut.hutobjects.all()
        if huttypes:
            qs = qs.filter(hut_type__in=huttypes)

        if q:
            qs = qs.filter(name__icontains=q)
    
        result_page = self.paginate_queryset(qs)
        serializer = HutSerializer(result_page, many=True)
        response =  self.get_paginated_response(serializer.data)

        return response 
   # Define Custom Queryset
    def get_queryset(self):
        qs = MountainHut.hutobjects.all()
        return qs
  
    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(MountainHut, slug=item)
    