myfacebook.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function (options) {

    this.friends = options.friends
    this.friends.fetch();
    this.users = options.users
    this.users.fetch();

    // this.listenTo(this.currentPost, 'sync', this.render)
    // this.listenTo(this.collection, 'refresh sync', this.render)
    this.listenToOnce(this.users, 'sync', this.render)
    this.listenToOnce(this.friends, 'sync', this.render)

  },

  events: {
    "submit .index-post-form": "addPost",

    "submit .comment-form": "addComment",
    "click .delete_comment": "deleteComment",
  },

  render: function () {

    var view = this.template({
      posts: this.collection,
      users: this.users,
      friends: this.friends
    })
    this.$el.html(view).addClass('content-container group');

    var that = this;

    this.showPosts(that);
    return this;
  },


  showPosts: function (that) {

      debugger
    that.collection.models.forEach(function(post) {
      var postShow = JST['posts/show']({
        post: post,
        users: that.users
      })
      // console.log("post: " + that.post);
      // that.post++;
      that.$('div.index-posts').prepend(postShow)

      if (post.comments().length > 0) {
        post.comments().forEach(function(comment){
          // console.log("comment: " + that.idx);
          // that.idx++;
          var commentShow = JST['comments/show']({
            post: comment,
            users: that.collection,
          });

          var div = document.createElement('div')
          $(div).addClass('post-comments').append(commentShow);
          that.$('div.index-post').first().append(div)


          if (parseInt(comment.get('user_id')) === myfacebook.currentUser.id) {

            var $div = $(document.createElement('div'))
            $div.addClass('delete_comment')

            var $button = $(document.createElement('button'))
            $button.attr('data', comment.id).addClass('delete_comment_button')
            $button.attr('post_id', post.id)

            $button.text("X")
            $div.append($button)
            that.$('div.index-post').first().append($div)
          }
        });
      }

      var commentForm = JST['comments/form']({
        post: post,
        users: that.collection,
      });

      that.$('div.index-post').first().append(commentForm);


    })

  },


  addComment: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();

    var comment = new myfacebook.Models.Comment();

    comment.set(attrs);
    comment.save({}, {
      success: function () {
        Backbone.history.loadUrl()
      },
    });

    this.render();
  },

  deleteComment: function (event) {
    event.preventDefault();


    var target_id = $(event.target).attr('data')
    var comment = this.model.comments().getOrFetch(target_id);
    comment.destroy()

    this.render();
  },

  addPost: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();

    var post = new myfacebook.Models.Post();

    post.set(attrs);
    post.save({}, {
      success: function () {
        Backbone.history.loadUrl()
      },
    });

    this.render();
  },

});
