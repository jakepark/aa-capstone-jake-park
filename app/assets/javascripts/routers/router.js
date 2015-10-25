myfacebook.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {

    this.$rootEl = options.$rootEl
    this.collection = new myfacebook.Collections.Users
    this.collection.fetch();

    // this.currentUser = this.collection.getOrFetch(myfacebook.currentUser.get('id'));
  },

  routes: {
    "": "index",
    "users/new": "new",
    "users/:id": "show",
    "users/:id/edit": "edit",
    "session/new": "signIn",
    "users": "users_index"
  },

  edit: function (id) {

    var user = this.collection.getOrFetch(id);
    var view = new myfacebook.Views.UserForm({
      model: user,
      collection: this.collection
    })
    this._swapView(view)
  },

  index: function () {
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    var collection = new myfacebook.Collections.Posts();
    collection.fetch();

    collection.comparator = function (model) {
      return model.get('posts_created_at');
    };

    function reverseSortBy (sortByFunction) {
      return function (left, right) {
        var l = sortByFunction(left);
        var r = sortByFunction(right);

        if (l === void 0) return -1;
        if (l === void 0) return 1;

        return l < r ? 1 : l > r ? - 1 : 0;
      };
    }

    collection.comparator = reverseSortBy(collection.comparator)

    collection.sort();

    var users = new myfacebook.Collections.Users();
    users.fetch();

    var friends = new myfacebook.Collections.Friends();
    friends.fetch();


    var view = new myfacebook.Views.PostsIndex({
      collection: collection,
      users: users,
      friends: friends
    });
    this._swapView(view);
  },

  // index: function () {
  //   var callback = this.index.bind(this);
  //   if (!this._requireSignedIn(callback)) { return; }
  //
  //   var view = new myfacebook.Views.UsersIndex({
  //     collection: this.collection
  //   });
  //   this._swapView(view);
  // },


  users_index: function () {
    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

      var view = new myfacebook.Views.UsersIndex({
        collection: this.collection
      });
      this._swapView(view);
  },

  new: function(){
    if (!this._requireSignedOut()) { return; }

    var model = new this.collection.model();
    var formView = new myfacebook.Views.SignUp({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  show: function (id) {

    var callback = this.show.bind(this, id);
    if (!this._requireSignedIn(callback)) { return; }


    var user = this.collection.getOrFetch(id);
    var view = new myfacebook.Views.UserShow({
      model: user,
      collection: this.collection
    })
    this._swapView(view)
  },

  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }

    var model = new this.collection.model();
    var formView = new myfacebook.Views.SignUp({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  _requireSignedIn: function(callback){
      if (!myfacebook.currentUser.isSignedIn()) {
        callback = callback || this._goHome.bind(this);
        this.signIn(callback);
        return false;
      }


      return true;
    },

  _requireSignedOut: function(callback){
    if (myfacebook.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },


  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }

});
