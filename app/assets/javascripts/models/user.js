myfacebook.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  toJSON: function () {
    var json = { user: _.clone(this.attributes)};
    return json;
  }
});
