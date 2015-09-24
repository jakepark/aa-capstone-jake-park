myfacebook.Views.UserShow = Backbone.View.extend({
    template: JST['users/show'],

    initialize: function () {
      this.listenTo(this.model, 'sync change add destroy', this.render)
      this.model.fetch();

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
      "submit .comment-form": "addPost"
    },


    addPost: function (event) {
      event.preventDefault();

      var attrs = $(event.currentTarget).serializeJSON();

      var post = new myfacebook.Models.Post();
      debugger

      post.set(attrs);
      post.save({
        success: function () {
          Backbone.history.navigate("", { trigger: true });
        }
      });

      this.render();
    },

  // !! DO NOT MESS WITH THE RENDER CODE !! //

    render: function () {
      var view = this.template({ user: this.model })



      var $profile_preview = $("<div>").addClass('profile_preview')
      var $para = $("<p>").text(this.model.escape('name_first')+ " " +
        this.model.escape('name_last'))
      var $profile_pic = $("<img>").addClass('profile_pic')
        .attr('src', this.model.get('image_url'))

      var $friend_auth = $("<p>").addClass('authorized')
        .text('You must be confirmed as a friend to view more info.')

      if (myfacebook.currentUser.id === this.model.id) {
        $friend_auth = null

        if (this.model.get('image_url') === 'default_profile.jpg') {

        var $avtr_form = $('<form>').addClass('avatar')
        var $avtr_input = $('<input>').attr('type', 'file').addClass('hidden')
          .attr('name', 'user[image]').attr('id', 'input-user-avatar')
        var $avtr_label = $('<label>').addClass('button-avatar-select')
          .attr('for', 'input-user-avatar').text('New Avatar')
        var $avtr_img = $('<img>').attr('id', 'preview-post-image')
        var $avtr_button = $('<button>').addClass('button-save').text('Save')
        var $avtr_cancel = $('<a>').addClass('button-cancel').attr('href', '#').text('Cancel')

        $avtr_form.append($avtr_input).append($avtr_label).append($avtr_img)
        .append($avtr_button).append($avtr_cancel)
        }
      }

      $profile_preview.append($para).append($profile_pic).append($friend_auth)
        .append($avtr_form)  // magic

      this.$el.html($profile_preview).addClass("profile-main")

      // case d: dug and target are friends. delete friend. see profile.

      var d = this.model.friends().findWhere({
        id: myfacebook.currentUser.get('id')
      });

      if (this.model.get('id') !== myfacebook.currentUser.get('id')) {

      if (d) {
        this.$el.html(view)

        this.$el.append(
        "<div class='remove_friend'><button>Remove Friend</button></div>"
        )

      } else {

        // case c: dug has already requested carl's friendship.

        var c = this.model.requests().findWhere({
          id: myfacebook.currentUser.get('id')
        });

        if (c) {

          // do nothing. seriously.

        } else {

            // case a: alpha has requested dug's friendship.

            var a = this.model.friendships().findWhere({
              user_id: this.model.get('id'),
              friend_id: myfacebook.currentUser.get('id')
            });

            if (a) { this.$el.prepend(
              "<div class='approve_friend'><button>Approve Friend</button></div><div class='deny_friend'><button>Deny Friend</button></div>"
            )} else {

            // case b: dug and target have no friendship status. add friend.

              this.$el.prepend("<div class='request_friend'><button>Add Friend</button></div>")
            }
          }
        }
      } else {      // this is your page

        this.$el.append(view)

      }
      // this.renderPosts();
      // this.renderPostForm();
      return this;
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
