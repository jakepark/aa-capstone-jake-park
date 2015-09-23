facebook.Views.PostForm = Backbone.LinkFormView.extend({
  formTemplate: JST['posts/form'],
  linkTemplate: JST['posts/form_link'],

  create: function (event) {
    event.preventDefault();

    this.collection.create({
      user_id: this.collection.user.id, // collection belongs to user?
      ord: this.collection.length,
      title: this.$('textarea').val()
    }, { wait: true });

    this.$('textarea').val('');
    this.$('textarea').focus();
  },

  render: function () {
    var content;
    if (this.formShowing) {
      content = this.formTemplate();
    } else {
      content = this.linkTemplate();
    }

    this.$el.html(content);
    this.delegateEvents();
    this.collection.trigger('resize');
    return this;
  }
});
