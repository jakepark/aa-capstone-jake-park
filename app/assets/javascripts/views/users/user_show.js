function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

myfacebook.Views.UserShow = Backbone.View.extend({
    template: JST['users/show'],

    initialize: function () {
      this.listenTo(this.model, 'sync change add destroy', this.render)
      this.model.fetch();
      this.listenTo(this.model.posts(), 'sync change add destroy', this.render)
      // this.collection = this.model.posts();     // might break new Avatar upload
      // this.listenTo(this.model, 'sync', this.render);
      // this.listenTo(this.collection, 'add', this.addPost);
    },

    events: {
      "click .request_friend": "createFriendship",
      "click .approve_friend": "approveFriendship",
      "click .deny_friend": "denyFriendship",
      "click .remove_friend": "removeFriendship",
      "submit .avatar": "newAvatar",
      "change #input-user-avatar": "fileInputChange",
      "click .gohome": "goHome",
      "click .header-logo": "goHome",
      "click .edit_profile": "goEdit",
      "submit .post-form": "addPost",
      "click .delete_post": "deletePost",
    },


    addPost: function (event) {
      event.preventDefault();

      var attrs = $(event.currentTarget).serializeJSON();

      var post = new myfacebook.Models.Post();

      post.set(attrs);
      post.save({
        success: function () {
          Backbone.history.loadUrl();
        }
      });

      this.render();
    },

    deletePost: function (event) {
      event.preventDefault();


      var target_id = $(event.target).attr('data')
      var post = this.model.posts().getOrFetch(target_id);
      post.destroy()

      this.render();
    },

  // !! DO NOT MESS WITH THE RENDER CODE !! //

    renderPublic: function () {
      var public_view = JST['users/public']({ user: this.model })
      this.$el.html(public_view)
      return this;
    },

    renderSelfie: function () {
      var selfie_view = JST['users/selfie']({ user: this.model })
      this.$el.html(selfie_view)

      this.model.posts().forEach(function(post) {
        var postShow = JST['posts/show']({ post: post })
        this.$('div.profile-posts').append(postShow)
      })
      return this;
    },

    renderFriend: function () {
      
      var friend_view = JST['users/friend']({ user: this.model })
      this.$el.html(friend_view)

      this.model.posts().forEach(function(post) {
        var postShow = JST['posts/show']({ post: post })
        this.$('div.profile-posts').append(postShow)
      })
      return this;
    },

    render: function () {
      var view = this.template({ user: this.model })

      // // if this is the currentUser page
      if (parseInt(this.model.id) === myfacebook.currentUser.id) {
        return this.renderSelfie();

      // // if this userPage is a friendOf currentUser
      } else if (

          this.model.friends().findWhere({
            id: myfacebook.currentUser.get('id')
          })

        ){
        return this.renderFriend();
      } else {

        return this.renderPublic();
      }

      return this;
        // return this.renderFriend();

      // if this is a friend page
      // return this.renderFriend()

      // if this is a public page
        // return this.renderPublic()


      //
      // var first_name = this.model.escape('name_first')
      //
      // var $friend_auth = $("<p>").addClass('authorized')
      //   .text('Add ' + capitalizeFirstLetter(first_name) + ' as a friend to view more info.')
      //
      // if (myfacebook.currentUser.id === this.model.id) {
      //   $friend_auth = null
      //
      // }
      // REFACTORED // ------------ //
      //
      // // $profile_preview.append($para).append($friend_auth)
      // //   .append($avtr_form)  // magic
      //
      // this.$el.html($profile_preview).addClass("profile-main")
      //
      // // case d: dug and target are friends. delete friend. see profile.
      //
      // var d = this.model.friends().findWhere({
      //   id: myfacebook.currentUser.get('id')
      // });
      //
      // if (false) {
      // // if (this.model.get('id') !== myfacebook.currentUser.get('id')) {
      //
      // if (d) {
      //   this.$el.html(view)
      //
      //
      //   // appending posts to profile !
      //   var that = this;
      //
      //   this.model.posts().forEach(function(post) {
      //     var $profile_post = $('<div>').addClass('profile-post')
      //     .text(post.get('body'))
      //     that.$el.append($profile_post)
      //   })
      //
      //   this.$el.append(
      //   "<div class='remove_friend'><button>Remove Friend</button></div>"
      //   )
      //
      // } else {
      //
      //   // case c: dug has already requested carl's friendship.
      //
      //   var c = this.model.requests().findWhere({
      //     id: myfacebook.currentUser.get('id')
      //   });
      //
      //   if (c) {
      //
      //     // do nothing. seriously. actually, notify:
      //     this.$el.append(
      //     "<p class='request_sent'>Friend Request Sent.</p>"
      //     )
      //
      //   } else {
      //
      //       // case a: alpha has requested dug's friendship.
      //
      //       var a = this.model.friendships().findWhere({
      //         user_id: this.model.get('id'),
      //         friend_id: myfacebook.currentUser.get('id')
      //       });
      //
      //       if (a) { this.$el.append(
      //         "<div class='approve_friend'><button>Approve Friend</button></div><div class='deny_friend'><button>Deny Friend</button></div>"
      //       )} else {
      //
      //       // case b: dug and target have no friendship status. add friend.
      //
      //         this.$el.append("<div class='request_friend'><button>Add Friend</button></div>")
      //       }
      //     }
      //   }
      // } else {      // this is your page
      //
      // REFACTORED // ------------ //
      //
      // }



    },   // End of render code //



    approveFriendship: function (e) {
      e.preventDefault();

      $( ".approve_friend" ).remove();
      $( ".deny_friend" ).remove();

      var target = this.model
      var target_id = target.get('id')

      var friendship = this.model.friendships().findWhere({
        user_id: target_id,
        friend_id: parseInt(myfacebook.currentUser.id)
      })

      friendship.set( "approved", true )

      friendship.save({}, {
        success: function () {
          this.render();
          // Backbone.history.loadUrl();
          // // Backbone.history.navigate('/users/' + target_id, {trigger: true});
          // view.reset();
        }
      });
      return false;
    },

    createFriendship: function (e) {
      e.preventDefault();


      $( ".request_friend" ).remove();

      var target = this.model
      var target_id = target.get('id')
      var friendship = new myfacebook.Models.Friend()
      friendship.set({
        user_id: myfacebook.currentUser.id,
        friend_id: target_id,
      })
      friendship.save({

        }, {
        success: function () {
          Backbone.history.navigate('/users/' + target_id, {trigger: true});
          view.reset();
        }
      });
      return false;
    },

    denyFriendship: function (event) {
      event.preventDefault();

      $( ".request_friend" ).remove();
      $( ".deny_friend" ).remove();

      var target = this.model
      var target_id = target.get('id')


      var friendship = this.model.friendships().findWhere({
        user_id: target_id,
        friend_id: parseInt(myfacebook.currentUser.id)

      })


      friendship.destroy({}, {
        success: function () {
          Backbone.history.navigate("#", {trigger: true});
          view.reset();
        }
      });
      return false;
    },


    removeFriendship: function (e) {
      e.preventDefault();

      $( ".remove_friend" ).remove();

      var target = this.model
      var target_id = target.get('id')

      var friendship = this.model.friendships().findWhere({
        user_id: target_id,
        friend_id: parseInt(myfacebook.currentUser.id)

      })

      if (friendship === undefined){
        var target = this.collection.findWhere({id: myfacebook.currentUser.id})

        friendship = target.friendships().findWhere({
          user_id: parseInt(myfacebook.currentUser.id),
          friend_id: target_id
        });
      };

      friendship.destroy({}, {
        success: function () {
          Backbone.history.navigate('/users/' + target_id, {trigger: true});
          view.reset();
        }
      });
      return false;

    },

    newAvatar: function(event){
      event.preventDefault();

      $( ".profile_pic" ).remove();

      this.model.collection = this.collection;  //instead of initialized
      var file = this.$("#input-user-avatar")[0].files[0];
      var formData = new FormData();

      formData.append("user[avatar]", file);
      var that = this;

      this.model.saveFormData(formData, {
        success: function(){
          that.collection.add(that.model);
          Backbone.history.navigate("", { trigger: true });
        }
      });
    },

    fileInputChange: function(event){
      console.log(event.currentTarget.files[0]);

      var that = this;
      var file = event.currentTarget.files[0];
      var reader = new FileReader();

      reader.onloadend = function(){
        that._updatePreview(reader.result);
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        that._updatePreview("");
      }
    },

    _updatePreview: function(src){
      this.$el.find("#preview-post-image").attr("src", src);
    },

    goHome: function(){
      Backbone.history.navigate("", { trigger: true });
    },

    goEdit: function(){

      Backbone.history.navigate("/users/" + this.model.id + "/edit", { trigger: true });
    },


});
