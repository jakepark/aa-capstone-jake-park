myfacebook.Collections.Friendships = Backbone.Collection.extend({
  model: myfacebook.Models.Friendship,
  url: '/api/friendships',


  getOrFetch: function (id) {
    var friendship = this.get(id);
    var friendships = this;

    if (friendship) {
      friendship.fetch();
    } else {
      friendship = new myfacebook.Models.Friendship({id: id});
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
