myfacebook.Collections.Users = Backbone.Collection.extend({
  model: myfacebook.Models.User,
  url: '/api/users',


  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;

    if (user) {
      user.fetch();
    } else {
      user = new myfacebook.Models.User({id: id});
      users.add(user);
      user.fetch({
        error: function () {
          users.remove(user);
        }
      })
    }
    return user
  }

});
