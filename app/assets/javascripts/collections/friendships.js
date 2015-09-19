myfacebook.Collections.Friendships = Backbone.Collection.extend({
  model: myfacebook.Models.Friendship,
  url: '/api/friendships',


  getOrFetch: function (id) {
    var Friendship = this.get(id);
    var Friendships = this;

    if (Friendship) {
      Friendship.fetch();
    } else {
      Friendship = new myfacebook.Models.Friendship({id: id});
      Friendships.add(Friendship);
      Friendship.fetch({
        error: function () {
          Friendships.remove(Friendship);
        }
      })
    }
    return Friendship
  }

});
