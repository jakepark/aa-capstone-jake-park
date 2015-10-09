myfacebook.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function (options) {

    this.users = options.users
    this.users.fetch();
    
    this.listenTo(this.currentPost, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.render)
    this.listenToOnce(this.users, 'sync', this.render)

  },

  events: {
    "submit .index-post-form": "addPost",
  },

  render: function () {

    var view = this.template({
      posts: this.collection,
      users: this.users
    })
    this.$el.html(view).addClass('content-container group');
    return this;
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
