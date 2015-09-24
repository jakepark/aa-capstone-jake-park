myfacebook.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  initialize: function () {

    this.listenTo(this.currentUser, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.render)

  },

  render: function () {


    var view = this.template({ users: this.collection })
    this.$el.html(view).addClass('content-container group');
    return this;
  }

});
