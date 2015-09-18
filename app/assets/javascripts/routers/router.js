myfacebook.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
    this.collection = new myfacebook.Collections.Users


    var userid = this.$rootEl.attr('data-current-user-id')
    myfacebook.current_user = new myfacebook.Models.User({id: userid})

  },

  routes: {
    "": "index",
    "users/:id": "show",
    "new_avatar": "newAvatar",
    "friendships": "indexFriendships"
  },

  // myfacebook.current_user.fetch({
  //   success: function () {
  //     console.log(myfacebook.current_user.toJSON())
  //   }
  // });

  index: function () {
    myfacebook.current_user.fetch();
    this.collection.fetch();
    var view = new myfacebook.Views.UsersIndex({
      collection: this.collection
    });
    this._swapView(view);
  },

  indexFriendships: function () {
    myfacebook.current_user.fetch();
    this.collection.fetch();
    var view = new myfacebook.Views.FriendshipsIndex({
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

  newAvatar: function () {
    var userNewAvatar = new myfacebook.Views.PostsShow({
      collection: this.collection
    });
    this._swapView(userNewAvatar);
  },


  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }

});
