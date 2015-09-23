myfacebook.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],


  initialize: function () {
    this.listenTo(this.model, 'sync change add destroy', this.render)
    this.model.fetch();
  },

  events: {
    "click .request_friend": "createFriendship",
    "click .approve_friend": "approveFriendship",
    "click .deny_friend": "denyFriendship",
    "click .remove_friend": "removeFriendship",
    "submit form": "newAvatar",
    "change #input-user-avatar": "fileInputChange",
    "click .gohome": "goHome",
    "click .header-logo": "goHome",
  },

  render: function () {
    var view = this.template({ user: this.model })

    var $container = $("<div>")
    var $para = $("<p>").text(this.model.escape('name_first')+ " " + this.model.escape('name_last'))
    var $profile_pic = $("<img>").addClass('profile_pic').attr('src', this.model.get('image_url'))


    $container.append($para).append($profile_pic)

    this.$el.html($container)

    // case d: dug and target are friends. delete friend. see profile.

    var d = this.model.friends().findWhere({
      id: myfacebook.currentUser.get('id')
    });

    if (this.model.get('id') !== myfacebook.currentUser.get('id')) {

    if (d) {
      this.$el.html(view)

      this.$el.prepend(
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
    }

    return this;
  },



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

        Backbone.history.navigate('/users/' + target_id, {trigger: true});
        view.reset();
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


});
