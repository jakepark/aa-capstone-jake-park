myfacebook.Models.Post = Backbone.Model.extend({
  urlRoot: '/api/posts',

  items: function () {
    if (!this._items) {
      this._items = new myfacebook.Collections.Items([], { post: this });
    }
    return this._items;
  },

  parse: function (resp) {
    if (resp.items) {
      this.items().set(resp.items);
      delete resp.items;
    }
    return resp;
  }
});
