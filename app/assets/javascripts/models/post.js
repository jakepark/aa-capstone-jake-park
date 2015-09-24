myfacebook.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  comments: function () {
    if (!this._comments) {
      this._comments = new myfacebook.Collections.Items([], { post: this });
    }
    return this._comments;
  },

  parse: function (resp) {
    if (resp.comments) {
      this.comments().set(resp.comments);
      delete resp.comments;
    }
    return resp;
  }
});
