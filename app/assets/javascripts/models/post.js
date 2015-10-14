myfacebook.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  comments: function () {
    if (!this._comments) {
      this._comments = new myfacebook.Collections.Comments([], { post: this });
    }

    this._comments.comparator = function (model) {
      return model.get('created_at');
    };

    return this._comments.sort();
  },

  parse: function (resp) {
    if (resp.comments) {
      this.comments().set(resp.comments);
      delete resp.comments;
    }
    return resp;
  }
});
