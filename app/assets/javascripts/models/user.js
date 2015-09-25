myfacebook.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  fullName: function(){
    return this.escape("name_first") + " " + this.escape("name_last");
  },

  toJSON: function () {
    var json = { user: _.clone(this.attributes)};
    return json;
  },


  saveFormData: function(formData, options){
    var method = this.isNew() ? "POST" : "PUT";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  },

  // All friends

  friends: function () {

    if (!this._friends) {
      this._friends = new myfacebook.Collections.Friends([], { user: this });
    }

    return this._friends;
  },

  // Requests made by current user

  requests: function () {

    if (!this._requests) {
      this._requests = new myfacebook.Collections.Requests([], { user: this });
    }

    return this._requests;
  },

  // Offers sent to current user

  friendships: function () {

    if (!this._friendships) {
      this._friendships = new myfacebook.Collections.Friendships([], { user: this });
    }

    return this._friendships;
  },

  pending: function () {

    if (!this._pending) {
      this._pending = new myfacebook.Collections.Pending([], { user: this });
    }

    return this._pending;
  },

  posts: function () {

    if (!this._posts) {
      this._posts = new myfacebook.Collections.Posts([], { user: this });
    }

    return this._posts;
  },

  friends_posts: function () {

    if (!this._friends_posts) {
      this._friends_posts = new myfacebook.Collections.Posts([], { user: this });
    }

    return this._friends_posts;
  },


  parse: function (response) {


    if (response.friendships) {
      this.friendships().set(response.friendships, { parse: true });
      delete response.friendships;
    }

    if (response.friends) {
      this.friends().set(response.friends, { parse: true });
      delete response.friends;
    }

    if (response.requests) {
      this.requests().set(response.requests, { parse: true });
      delete response.requests;
    }

    if (response.pending) {
      this.pending().set(response.pending, { parse: true });
      delete response.pending;
    }

    if (response.posts) {
      this.posts().set(response.posts, { parse: true });
      delete response.posts;
    }

    if (response.friends_posts) {
      this.friends_posts().set(response.friends_posts, { parse: true });
      delete response.friends_posts;
    }

    return response;
  },

});

myfacebook.Models.CurrentUser = myfacebook.Models.User.extend({
  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(){
        options.error && options.error();
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
      console.log("currentUser is signed in!", this);
    } else {
      this.trigger("signOut");
      console.log("currentUser is signed out!", this);
    }
  },


});
