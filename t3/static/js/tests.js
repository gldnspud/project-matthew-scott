var assert = chai.assert;
var should = chai.should();

describe('todo.List', function () {

  describe('#items', function () {

    var list;

    var setup = function () {
      list = new t3.views.todo.List();
    };

    it("begins empty", function () {
      setup();
      list.items().length.should.equal(0);
    });

    it("listens for 'item.added' messages and add corresponding todo.Item objects", function () {
      setup();

      PubSub.publishSync(t3.topics.item.added, {
        id: 1,
        text: 'Drink water',
        completed: false,
        priority: 1,
        due_date: null
      });

      var items = list.items();
      items.length.should.equal(1);

      var item = items[0];
      item.id().should.equal(1);
      item.text().should.equal('Drink water');
      item.completed().should.equal(false);
      item.priority().should.equal(1);
      should.not.exist(item.due_date());
    });

  });

  describe('#orderedItems', function () {

    var list;

    var setup = function () {
      list = new t3.views.todo.List();
      PubSub.publishSync(t3.topics.item.added, {
        id: 1,
        text: 'Drink water',
        completed: false,
        priority: 1,
        due_date: '2013-11-21'
      });
      PubSub.publishSync(t3.topics.item.added, {
        id: 2,
        text: 'Eat vegetables',
        completed: false,
        priority: 3,
        due_date: '2013-11-19'
      });
      PubSub.publishSync(t3.topics.item.added, {
        id: 3,
        text: 'Create Toptal demo project',
        completed: false,
        priority: 2,
        due_date: null
      });
    };

    it("has the same number of items as #items", function () {
      setup();
      list.orderedItems().length.should.equal(list.items().length);
    });

    it("is ordered in ascending priority order by default", function () {
      setup();
      var ids = _(list.orderedItems()).map(function (item) { return item.id(); });
      var expected = [1, 3, 2];
      assert(_.isEqual(ids, expected));
    });

    it("is ordered in descending priority order when orderedItemsAscending is false", function () {
      setup();
      list.orderedItemsAscending(false);
      var ids = _(list.orderedItems()).map(function (item) { return item.id(); });
      var expected = [2, 3, 1];
      assert(_.isEqual(ids, expected));
    });

    it("is ordered in ascending due date order when orderedItemsKey is set to due_date", function () {
      setup();
      list.orderedItemsKey('due_date');
      var ids = _(list.orderedItems()).map(function (item) { return item.id(); });
      var expected = [3, 2, 1];
      console.log(ids, expected);
      assert(_.isEqual(ids, expected));
    });

    it("is ordered in descending due date order when orderedItemsKey is set to due_date and orderedItemsAscending is false", function () {
      setup();
      list.orderedItemsKey('due_date');
      list.orderedItemsAscending(false);
      var ids = _(list.orderedItems()).map(function (item) { return item.id(); });
      var expected = [1, 2, 3];
      console.log(ids, expected);
      assert(_.isEqual(ids, expected));
    });
  });

});
