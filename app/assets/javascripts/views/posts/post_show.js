facebook.Views.PostShow = Backbone.View.extend({
  template: JST['posts/show'],

  className: 'post well well-sm post-display',

  events: {
    'click': 'showModal'
  },

  attributes: function() {
    return {
      'data-post-id': this.model.id
    };
  },

  render: function () {
    var content = this.template({
      post: this.model
    });
    this.$el.html(content);
    return this;
  },

  showModal: function () {
    this.modalView = this.modalView ||
      new facebook.Views.PostModal({ model: this.model });
    $('body').prepend(this.modalView.render().$el);
    this.modalView.delegateEvents();
  },
});
