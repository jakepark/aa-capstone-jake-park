window.myfacebook = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new myfacebook.Models.CurrentUser();
    this.currentUser.fetch();


    this.header = new myfacebook.Views.Header({ el: "#header" });
    this.router = new myfacebook.Routers.Router({ $rootEl: $("#main") });
    Backbone.history.start();

  }
};
