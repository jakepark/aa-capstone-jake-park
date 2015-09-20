myfacebook.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {

    this.$rootEl = options.$rootEl
    this.collection = new myfacebook.Collections.Users
    this.collection.fetch();

  },

  routes: {
    "": "index",
    "users/:id": "show",
    "session/new": "signIn"
  },

  index: function () {

    // myfacebook.currentUser.fetch();
    // this.collection.fetch();

    var callback = this.index.bind(this);
    if (!this._requireSignedIn(callback)) { return; }


    var view = new myfacebook.Views.UsersIndex({
      collection: this.collection
    });
    this._swapView(view);
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

    var signInView = new myfacebook.Views.SignIn({
      callback: callback
    });
    this._swapView(signInView);
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
