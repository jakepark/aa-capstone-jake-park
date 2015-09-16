myFacebook.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  render: function () {
    
    var view = this.template({ user: this.model })
    this.$el.html(view);
    return this;
  }

});
