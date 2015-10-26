myfacebook.Collections.Friends = Backbone.Collection.extend({
  model: myfacebook.Models.Friend,
  url: '/api/friends',

  initialize: function (models, options) {

    // this.user = options.user
  },

  getOrFetch: function (model) {
    var friend = this.get(model);
    var friends = this;

    if (friend) {
      friend.fetch();
    } else {
      friend = model;
      friends.add(friend);
      friend.fetch({
        error: function () {
          friends.remove(friend);
        }
      })
    }
    return friend
  }

});

myfacebook.Collections.friends = new myfacebook.Collections.Friends
