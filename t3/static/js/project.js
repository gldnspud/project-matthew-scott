var t3 = t3 || {};

// PubSub topics
t3.topics = t3.topics || {};
t3.topics.item = t3.topics.item || {};
t3.topics.item.added = 'item.added';
t3.topics.item.create = 'item.create';

t3.views = t3.views || {};

t3.views.todo = t3.views.todo || {};

t3.views.todo.Item = function (values) {

  values = values || {};

  this.id = ko.observable(values.id);
  this.text = ko.observable(values.text);
  this.completed = ko.observable(values.completed);
  this.priority = ko.observable(values.priority);
  this.due_date = ko.observable(values.due_date);

};

t3.views.todo.List = function () {

  var self = this;

  self.items = ko.observableArray();
  var idItemMap = {
    // id: item
  };

  self.nextNewItemId = -1;
  self.newItemText = ko.observable('');
  self.canAddNewItem = ko.computed(function () {
    return self.newItemText().length > 0;
  });
  self.addNewItem = function () {
    if (self.newItemText() !== '') {
      PubSub.publish(t3.topics.item.create, {
        id: self.nextNewItemId--,
        text: self.newItemText(),
        priority: 1
      });
      self.newItemText('');
    }
  };

  // item.added -> add item to items and id:item map
  PubSub.subscribe(t3.topics.item.added, function (topic, message) {
    var item = new t3.views.todo.Item(message);
    self.items.push(item);
    idItemMap[item.id()] = item;
  });

  // item.create -> forward to item.added
  PubSub.subscribe(t3.topics.item.create, function (topic, message) {
    PubSub.publish(t3.topics.item.added, message);
  });

  // item.create -> POST item to API
  PubSub.subscribe(t3.topics.item.create, function (topic, message) {
    var request = $.ajax({
      url: '/api/items/',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(message),
      type: 'POST'
    });
    request.success(function (response) {
      // update the item's client-only ID to use the one returned by API.
      var item = idItemMap[message.id];
      item.id(response.id);
      delete idItemMap[message.id];
      idItemMap[response.id] = item;
    });
  });

};

// make sure csrftoken is injected into each $.ajax POST
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
$.ajaxSetup({
  beforeSend: function (xhr, s) {
    if (s.type == 'POST') {
      xhr.setRequestHeader('X-CSRFToken', csrftoken);
    }
  }
});
