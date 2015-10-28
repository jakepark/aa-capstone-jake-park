myfacebook.Views.PostsIndex = Backbone.View.extend({
  template: JST['posts/index'],

  initialize: function (options) {

    this.friends = options.friends
    // this.friends.fetch();
    this.users = options.users
    // this.users.fetch();


    // this.listenTo(this.currentPost, 'sync', this.render)
    this.listenTo(this.collection, 'refresh sync', this.render)
    this.listenToOnce(this.users, 'sync', this.render)
    this.listenToOnce(this.friends, 'sync', this.render)

  },

  events: {
    "submit .index-post-form": "addPost",

    "submit .comment-form": "addComment",
    "click .delete_comment_button": "confirmDelete",
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


  isFriend: function (poster_id) {
    if (this.friends.findWhere({
      id: poster_id
      })){
      return true;
    } else {
      return false;
    }
  },

  showPosts: function (that) {
    
    that.collection.models.forEach(function(post) {

      var poster_id = post.get('user_id')
      if (that.isFriend(poster_id) || poster_id === myfacebook.currentUser.id){

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
              users: that.users,
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
          users: that.users,
        });

        that.$('div.index-post').first().append(commentForm);

      }
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

  confirmDelete: function (event) {
    event.preventDefault();


    var target_id = $(event.target).attr('data')
    var post_id = $(event.target).attr('post_id')
    var posts = this.collection

    if (confirm("Are you sure you want to delete this comment?")){

      var post = posts.getOrFetch(post_id)
      var comments = post.comments()
      var comment = comments.getOrFetch(target_id);

      this.deleteComment(post, comments, comment)
    }

  },


  deleteComment: function (post, comments, comment) {

    comments.remove(comment);
    post.comments().remove(comment)

    comment.destroy();

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
