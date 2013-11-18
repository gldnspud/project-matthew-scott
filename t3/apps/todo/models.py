from django.db import models


class Item(models.Model):

    user = models.ForeignKey('auth.User', db_index=True)
    text = models.TextField()
    priority = models.IntegerField(default=1)
    due_date = models.DateField(blank=True, null=True)

    def __unicode__(self):
        return self.text
