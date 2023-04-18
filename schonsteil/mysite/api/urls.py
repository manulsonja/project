from .views import *
from rest_framework.routers import DefaultRouter

app_name = 'api'

router = DefaultRouter()
router.register('touren', ViewTouren, basename='tour')
router.register('hochtour', ViewHochtouren, basename='hochtour')
router.register('wandern', ViewWandern, basename='wandern')
router.register('schitour', ViewSkitour, basename='skitour')
router.register('hike and fly', ViewHaF, basename='hikeandflz')
router.register('klettern', ViewKlettertour, basename='hikeandflz')
router.register('test', PictureField , basename='pic')
router.register('huette', ViewHut, basename='')


urlpatterns = router.urls

# urlpatterns = [
#     path('<int:pk>/', PostDetail.as_view(), name='detailcreate'),
#     path('', PostList.as_view(), name='listcreate'),
# ]