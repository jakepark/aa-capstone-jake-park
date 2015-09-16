myFacebook.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  render: function () {
    
    var view = this.template({ users: this.collection })
    this.$el.html(view);
    return this;
  }

});
