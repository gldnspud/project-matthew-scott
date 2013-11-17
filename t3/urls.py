from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('t3.views',
    # Examples:
    # url(r'^$', 't3.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', 'index'),

    url(r'^admin/', include(admin.site.urls)),
)
