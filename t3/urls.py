from django.conf.urls import patterns, include, url
from django.contrib import admin

from rest_framework import routers

from t3.apps import todo
import t3.apps.todo.views


admin.autodiscover()


router = routers.DefaultRouter()
router.register(r'items', todo.views.ItemViewSet)


urlpatterns = patterns('t3.views',
    # Examples:
    # url(r'^$', 't3.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'index', name='index'),

    url(r'^accounts/', include('allauth.urls')),
    url(r'^accounts/profile/$', 'profile', name='account_profile'),

    url(r'^admin/', include(admin.site.urls)),

    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^todo/', include('t3.apps.todo.urls', namespace='todo')),
)
