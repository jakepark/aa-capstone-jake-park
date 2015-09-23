facebook.Views.PostModal = Backbone.CompositeView.extend({
  template: JST['posts/modal'],

  initialize: function () {
    this.model.fetch();
    this.listenTo(this.model, 'sync', this.render);
    this.itemListView = new facebook.Views.ItemsList({
      collection: this.model.items()
    });

    this.addSubview('.post-modal-items', this.itemListView);
  },

  events: {
    'click .post-modal-dismiss': 'dismiss',
    'click .post-modal-backdrop' : 'dismiss'
  },

  dismiss: function (event) {
    event.preventDefault();
    this.remove();
  },

  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
