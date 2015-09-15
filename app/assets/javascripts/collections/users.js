myFacebook.Collections.Users = Backbone.Collection.extend({
  model: myFacebook.Models.User,
  url: '/api/users',


  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;

    if (user) {
      user.fetch();
    } else {
      user = new myFacebook.Models.User({id: id});
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
