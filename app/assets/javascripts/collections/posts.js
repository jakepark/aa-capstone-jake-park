myfacebook.Collections.Posts = Backbone.Collection.extend({
  model: myfacebook.Models.Post,
  url: '/api/posts',

  initialize: function (models, options) {

    // this.user = options.user
  },

  getOrFetch: function (id) {
    var post = this.get(id),
      posts = this;
    if (!post) {
      post = new myfacebook.Models.Post({ id: id });
      post.fetch({
        success: function () {
          posts.add(post);
        },
      });
    } else {
      post.fetch();
    }
    return post;
  }
});

myfacebook.Collections.posts = new myfacebook.Collections.Posts
