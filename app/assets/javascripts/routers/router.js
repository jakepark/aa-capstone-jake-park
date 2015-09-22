myfacebook.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {

    this.$rootEl = options.$rootEl
    this.collection = new myfacebook.Collections.Users
    this.collection.fetch();
    
    // this.currentUser = this.collection.getOrFetch(myfacebook.currentUser.get('id'));
  },

  routes: {
    "": "index",
    "users/:id": "show",
    "session/new": "new",
    // "session/new": "signUp",
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


    new: function(){
      debugger
      if (!this._requireSignedOut()) { return; }

      var model = new this.collection.model();
      var formView = new myfacebook.Views.UsersForm({
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

  signUp: function(callback){

    if (!this._requireSignedOut(callback)) { return; }

    var signInView = new myfacebook.Views.UsersForm({
      callback: callback,
      collection: this.collection,
    });
    this._swapView(signInView);
  },

  _requireSignedIn: function(callback){
      if (!myfacebook.currentUser.isSignedIn()) {
        callback = callback || this._goHome.bind(this);
        this.signUp(callback);
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
