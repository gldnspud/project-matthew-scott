from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.shortcuts import redirect, render
from django.utils.cache import patch_response_headers

from rest_framework.authtoken.models import Token


def index(request):
    if request.user.is_authenticated():
        response = redirect(reverse('todo:index'))
    else:
        response = render(request, 'index.html')
    # Prevent caching so logins go to the correct page.
    patch_response_headers(response, cache_timeout=0)
    return response


@login_required
def profile(request):
    token, created = Token.objects.get_or_create(user=request.user)
    return render(request, 'account/profile.html', {
        'token': token,
    })
