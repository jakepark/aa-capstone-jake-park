myfacebook.Collections.Posts = Backbone.Collection.extend({
  model: myfacebook.Models.Post,
  url: '/api/posts',

  initialize: function (models, options) {

    // this.user = options.user
  },

  getOrFetch: function (model) {
    var post = this.get(model);
    var posts = this;

    if (post) {
      post.fetch();
    } else {
      post = model;
      posts.add(post);
      post.fetch({
        error: function () {
          posts.remove(post);
        }
      })
    }
    return post
  }

});

myfacebook.Collections.posts = new myfacebook.Collections.Posts
