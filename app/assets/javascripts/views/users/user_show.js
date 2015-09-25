function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

myfacebook.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function () {

    this.model.fetch();

    this.listenTo(this.model, 'sync change add destroy', this.render)
    this.listenTo(this.model.posts(), 'sync change add destroy', this.render)
    this.listenTo(this.collection, 'sync change add destroy', this.render);
    // this.listenTo(this.model.friendships(), 'change add create destroy', this.model.fetch())
    // this.listenTo(this.model, 'newAvatar', myfacebook.currentUser.fetch())
    // this.collection = this.model.posts();     // might break new Avatar upload
    // this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    "click .add_friend": "createFriendship",
    "click .approve_friend": "approveFriendship",
    "click .deny_friend": "removeFriendship",
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
    post.save({}, {
      success: function () {
        Backbone.history.loadUrl()
      },
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
    this.$el.html(public_view).addClass("profile-main group")
    return this;
  },

  renderSelfie: function () {
    var selfie_view = JST['users/selfie']({ user: this.model })
    this.$el.html(selfie_view).addClass("profile-main group")

    this.model.posts().forEach(function(post) {
      var postShow = JST['posts/show']({ post: post })
      this.$('div.profile-posts').prepend(postShow)
    })

    this.model.friends().forEach(function(friend) {
      var friendShow = JST['friends/show']({ friend: friend })
      this.$('div.profile-friends').append(friendShow)
    })

    return this;
  },

  renderFriend: function () {

    var friend_view = JST['users/friend']({ user: this.model })
    this.$el.html(friend_view).addClass("profile-main group")

    this.model.posts().forEach(function(post) {
      var postShow = JST['posts/show']({ post: post })
      this.$('div.profile-posts').prepend(postShow)
    })

    this.model.friends().forEach(function(friend) {
      var friendShow = JST['friends/show']({ friend: friend })
      this.$('div.profile-friends').append(friendShow)
    })

    return this;
  },

  render: function () {

    var view = this.template({ user: this.model })

    // // if this is the currentUser page
    if (parseInt(this.model.id) === myfacebook.currentUser.id) {
      return this.renderSelfie();
    // // if this userPage is a friendOf currentUser
    } else if ( this.isFriend() ){
      return this.renderFriend();
    } else {
      return this.renderPublic();
    }

    return this;
  },   // End of render code //

  isFriend: function () {
    if (this.model.friends().findWhere({
      id: myfacebook.currentUser.get('id')
      })){
      return true;
    } else {
      return false;
    }
  },




  createFriendship: function (e) {
    e.preventDefault();


    $( ".add_friend" ).remove();

    var target = this.model
    var target_id = target.get('id')
    var friendship = new myfacebook.Models.Friend()
    friendship.set({
      user_id: myfacebook.currentUser.id,
      friend_id: target_id,
    })

    friendship.save({
      success: function () {

        this.renderPublic()
      }.bind(this)
    })

    return false;
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

    debugger
    friendship.save({}, {
      success: function () {
        this.model.friendships().add(friendship)
        this.renderFriend()
      }.bind(this)
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


    friendship.destroy({
      success: function () {

        this.renderPublic()
      }.bind(this)
    })
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
      success: function () {

        myfacebook.currentUser.set({image_url: this.model.get('image_url')});
        Backbone.history.loadUrl()
      }.bind(this),
    });

    this.render();

    //
    // this.model.saveFormData(formData, {
    //   success: function(){
    //
    //     that.collection.add(that.model);
    //     Backbone.history.loadUrl()
    //   },
    //
    // });
  },

  fileInputChange: function(event){
    console.log(event.currentTarget.files[0]);

    this.$('#button-save').removeClass()
    this.$('#button-cancel').removeClass()
    this.$('#edit_button').addClass('hidden')
    this.$('.button-avatar-select').addClass('hidden')
    this.$('.avatar').addClass("avatar_click")

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
