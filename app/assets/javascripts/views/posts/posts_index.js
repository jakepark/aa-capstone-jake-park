myfacebook.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function (options) {

    this.users = options.users
    this.users.fetch();

    this.listenTo(this.currentPost, 'sync', this.render)
    this.listenTo(this.collection, 'refresh sync', this.render)
    this.listenToOnce(this.users, 'sync', this.render)

  },

  events: {
    "submit .index-post-form": "addPost",

    "submit .comment-form": "addComment",
    "click .delete_comment": "deleteComment",
  },

  render: function () {

    var view = this.template({
      posts: this.collection,
      users: this.users
    })
    this.$el.html(view).addClass('content-container group');
    return this;
  },

  addComment: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();

    var comment = new myfacebook.Models.Comment();

    comment.set(attrs);
    comment.save({}, {
      success: function () {
        Backbone.history.loadUrl()
      },
    });

    this.render();
  },

  deleteComment: function (event) {
    event.preventDefault();


    var target_id = $(event.target).attr('data')
    var comment = this.model.comments().getOrFetch(target_id);
    comment.destroy()

    this.render();
  },

  addPost: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();

    var post = new myfacebook.Models.Post();

    post.set(attrs);
    post.save({}, {
      success: function () {
        Backbone.history.loadUrl()
      },
    });

    this.render();
  },

});
