myfacebook.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function () {
    var users = new myfacebook.Collections.Users();
    users.fetch();
    this.users = users
    debugger

    this.listenTo(this.currentPost, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.render)

  },

  render: function () {
    // var users = new myfacebook.Collections.Users
    // users.fetch();
    debugger

    var view = this.template({
      posts: this.collection,
      users: this.users
    })
    this.$el.html(view).addClass('content-container group');
    return this;
  }

});
