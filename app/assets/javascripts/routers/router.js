myfacebook.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
    this.collection = new myfacebook.Collections.Users


    var userid = this.$rootEl.attr('data-current-user-id')
    var current_user = new myfacebook.Models.User({id: userid})
    current_user.fetch()
    myfacebook.current_user = current_user


  },

  routes: {
    "": "index",
    "users/:id": "show"
  },

  index: function () {
    
    myfacebook.current_user.fetch({
      success: function () {
        console.log(myfacebook.current_user.toJSON())
      }
    });
    this.collection.fetch();
    var view = new myfacebook.Views.UsersIndex({
      collection: this.collection
    });
    this._swapView(view);
  },

  show: function (id) {

    var user = this.collection.getOrFetch(id);
    var view = new myfacebook.Views.UserShow({
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
