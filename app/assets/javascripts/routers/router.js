myFacebook.Routers.Users = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
    this.collection = new myFacebook.Collections.Users
  },

  routes: {
    "": "index",
    "users/:id": "show"
  },

  index: function () {
    this.collection.fetch();
    var view = new myFacebook.Views.Users({
      collection: this.collection
    });
    this._swapView(view);
  },

  show: function (id) {
    var user = this.collection.getOrFetch(id);
    var view = new myFacebook.Views.UserShow({
      model: user,
      collection: this.collection
    })
    this._swapView(view)
  },


  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }

});
