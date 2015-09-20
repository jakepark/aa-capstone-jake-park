myfacebook.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

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

  friendships: function () {

    if (!this._friendships) {
      this._friendships = new myfacebook.Collections.Friendships([], { user: this });
    }

    return this._friendships;
  },

  parse: function (response) {

    if (response.friendships) {
      this.friendships().set(response.friendships, { parse: true });
      delete response.friendships;
    }

    return response;
  }


});
