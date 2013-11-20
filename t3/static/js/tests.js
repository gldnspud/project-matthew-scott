var should = chai.should();

describe('todo.List', function () {

  describe('#items', function () {

    var list = new t3.views.todo.List();

    it("should begin empty", function () {
      list.items().length.should.equal(0);
    });

    it("should listen for 'item.added' messages and add corresponding todo.Item objects", function () {
      PubSub.publishSync(t3.topics.ITEM_ADDED, {
        text: 'Drink water',
        completed: false,
        priority: 1,
        due_date: null
      });

      var items = list.items();
      items.length.should.equal(1);

      var item = items[0];
      item.text().should.equal('Drink water');
      item.completed().should.equal(false);
      item.priority().should.equal(1);
      should.not.exist(item.due_date());
    });

  });

  describe('#sortedItems', function () {

    it("should have the same amount of tiems as #items");

  });

});