myfacebook.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function (options) {
    this.users = options.users

    this.listenTo(this.currentPost, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.render)
    this.listenToOnce(this.users, 'sync', this.render)

  },

  render: function () {
    // debugger
    var view = this.template({
      posts: this.collection,
      users: this.users
    })
    this.$el.html(view).addClass('content-container group');
    return this;
  }

});
