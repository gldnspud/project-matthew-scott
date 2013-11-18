from django.conf.urls import patterns, url


urlpatterns = patterns('t3.apps.todo.views',
    url(r'^$', 'index', name='index'),
)
{}