myfacebook.Collections.Posts = Backbone.Collection.extend({
  comparator: 'ord',
  model: myfacebook.Models.Post,
  url: 'api/posts',

  initialize: function (models, options) {
    this.user = options.user;
  },
});
