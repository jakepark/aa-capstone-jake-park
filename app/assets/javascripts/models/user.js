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

  friends: function () {

    if (!this._friends) {
      this._friends = new myfacebook.Collections.Friends([], { user: this });
    }

    return this._friends;
  },

  requests: function () {

    if (!this._requests) {
      this._requests = new myfacebook.Collections.Requests([], { user: this });
    }

    return this._requests;
  },


  parse: function (response) {
    debugger

    if (response.friends) {
      this.friends().set(response.friends, { parse: true });
      delete response.friends;
    }

    if (response.requests) {
      this.requests().set(response.requests, { parse: true });
      delete response.requests;
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
