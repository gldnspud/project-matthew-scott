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

  var self = this;

  self.id = ko.observable(values.id);
  self.text = ko.observable(values.text);
  self.completed = ko.observable(values.completed);
  self.priority = ko.observable(values.priority);
  self.due_date = ko.observable(values.due_date);

  self.editors = {};

  self.editors.currentActive = ko.observable();

  self.editors.text = {};
  self.editors.text.newValue = ko.observable();
  self.editors.text.isActive = ko.computed(function () {
    return self.editors.currentActive() == 'text';
  });
  self.editors.text.canSave = ko.computed(function () {
    return self.editors.text.newValue() !== '';
  });
  self.editors.text.edit = function () {
    self.editors.text.newValue(self.text());
    self.editors.currentActive('text');
  };
  self.editors.text.save = function () {
    self.text(self.editors.text.newValue());
    self.editors.currentActive(undefined);
  };
  self.editors.text.cancel = function () {
    self.editors.currentActive(undefined);
  };

  self.editors.priority = {};
  self.editors.priority.newValue = ko.observable();
  self.editors.priority.isActive = ko.computed(function () {
    return self.editors.currentActive() == 'priority';
  });
  self.editors.priority.canSave = ko.computed(function () {
    return self.editors.priority.newValue() !== '';
  });
  self.editors.priority.edit = function () {
    self.editors.priority.newValue(self.priority());
    self.editors.currentActive('priority');
  };
  self.editors.priority.save = function () {
    self.priority(self.editors.priority.newValue());
    self.editors.currentActive(undefined);
  };
  self.editors.priority.cancel = function () {
    self.editors.currentActive(undefined);
  };

  self.editors.due_date = {};
  self.editors.due_date.newValue = ko.observable();
  self.editors.due_date.isActive = ko.computed(function () {
    return self.editors.currentActive() == 'due_date';
  });
  self.editors.due_date.canSave = ko.computed(function () {
    return self.editors.due_date.newValue() !== '';
  });
  self.editors.due_date.edit = function () {
    self.editors.due_date.newValue(self.due_date());
    self.editors.currentActive('due_date');
  };
  self.editors.due_date.save = function () {
    self.due_date(self.editors.due_date.newValue());
    self.editors.currentActive(undefined);
  };
  self.editors.due_date.cancel = function () {
    self.editors.currentActive(undefined);
  };

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
