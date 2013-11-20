var t3 = t3 || {};

// PubSub topics
t3.topics = t3.topics || {};
t3.topics.item = t3.topics.item || {};
t3.topics.item.added = 'item.added';

t3.views = t3.views || {};

t3.views.todo = t3.views.todo || {};

t3.views.todo.Item = function (values) {

  values = values || {};

  this.text = ko.observable(values.text);
  this.completed = ko.observable(values.completed);
  this.priority = ko.observable(values.priority);
  this.due_date = ko.observable(values.due_date);

};

t3.views.todo.List = function () {

  var items = this.items = ko.observableArray();

  // Add item to list on item.added
  PubSub.subscribe(t3.topics.item.added, function (topic, message) {
    var item = new t3.views.todo.Item(message);
    items.push(item);
  });

};
