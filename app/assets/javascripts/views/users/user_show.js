myfacebook.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],


  initialize: function () {
    this.listenTo(this.model, 'sync change add destroy', this.render)

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
    this.$el.html(view);
    return this;
  },


// var friend = this.model.friendships().findWhere({user_id: 6}) // works on russell "6"...
  approveFriendship: function (e) {
    e.preventDefault();

    var target = this.model  // second user '4'
    var target_id = target.get('id')

    var friendship = this.model.friendships().findWhere({
      user_id: target_id,
      friend_id: parseInt(myfacebook.currentUser.id)
    })

    friendship.set(
      "approved", true
    )

    // var friendship2 = new myfacebook.Models.Friendship({
    //   user_id: parseInt(myfacebook.currentUser.id),
    //   friend_id: target_id
    // })
    //
    // friendship2.save()

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

    var target = this.model
    var target_id = target.get('id')
    var friendship = new myfacebook.Models.Friendship()
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

  denyFriendship: function (e) {
    e.preventDefault();

    var target = this.model  // second user '3'
    var target_id = target.get('id')


    var friendship = this.model.friendships().findWhere({
      user_id: target_id,  // 3
      friend_id: parseInt(myfacebook.currentUser.id)  // 2

    })


    friendship.destroy({}, {
      success: function () {
        Backbone.history.navigate('/users/' + target_id, {trigger: true});
        view.reset();
      }
    });
    return false;
  },


  removeFriendship: function (e) {
    e.preventDefault();

    var target = this.model  // second user '4'
    var target_id = target.get('id')


    var friendship = this.model.friendships().findWhere({
      user_id: target_id,
      friend_id: parseInt(myfacebook.currentUser.id)

    })

    if (friendship === undefined){
      friendship = myfacebook.currentUser.friendships().findWhere({
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
