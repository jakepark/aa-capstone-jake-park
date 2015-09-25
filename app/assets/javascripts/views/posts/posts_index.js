myfacebook.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function () {

    this.listenTo(this.currentPost, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.render)

  },

  render: function () {
  
    var view = this.template({ posts: this.collection })
    this.$el.html(view).addClass('content-container group');
    return this;
  }

});
