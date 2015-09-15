window.myFacebook = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new myFacebook.Routers.Router({
      $rootEl = $("#main")
    })
    Backbone.history.start();
  }
};
