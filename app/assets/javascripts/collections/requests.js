myfacebook.Collections.Requests = Backbone.Collection.extend({
  model: myfacebook.Models.Friend,
  url: '/api/friendships',

  initialize: function (models, options) {

    // this.user = options.user
  },

  getOrFetch: function (model) {
    var friendship = this.get(model);
    var friendships = this;

    if (friendship) {
      friendship.fetch();
    } else {
      friendship = model;
      friendships.add(friendship);
      friendship.fetch({
        error: function () {
          friendships.remove(friendship);
        }
      })
    }
    return friendship
  }

});

myfacebook.Collections.requests = new myfacebook.Collections.Requests
