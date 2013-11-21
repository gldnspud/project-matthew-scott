ko.bindingHandlers.escPress = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    var allBindings = allBindingsAccessor();
    element.addEventListener('keydown', function (event) {
      var keyCode = (event.which ? event.which : event.keyCode);
      if (keyCode === 27) {
        allBindings.escPress.call(viewModel);
        return false;
      }
      return true;
    });
  }
};
