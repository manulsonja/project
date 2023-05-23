from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, ProfileView


app_name = 'users'

urlpatterns = [
    path('profile/', ProfileView.as_view(), name="profile_data"),
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist')
]
