myfacebook.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  initialize: function () {
    this.collection.fetch();

    this.listenTo(this.currentUser, 'sync', this.render)
    this.listenTo(this.collection, 'sync', this.render)

  },

  events: {
    "click .add_friend": "createFriendship",
    "click .approve_friend": "approveFriendship",
    "click .deny_friend": "removeFriendship",
    "click .remove_friend": "removeFriendship",
  },


  render: function () {

    var view = this.template({ users: this.collection })
    this.$el.html(view).addClass('content-container group');
    return this;
  },

  createFriendship: function (e) {
    e.preventDefault();

    $( ".add_friend" ).remove();

    var target_id = $(e.currentTarget).attr('data')
    var target = this.collection.getOrFetch(target_id)

    var friendship = new myfacebook.Models.Friend()
    friendship.set({
      user_id: parseInt(myfacebook.currentUser.id),
      friend_id: parseInt(target_id)
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

    var target_id = $(e.currentTarget).attr('data')
    var target = this.collection.getOrFetch(target_id)

    var friendship = target.friendships().findWhere({
      user_id: parseInt(target_id),
      friend_id: parseInt(myfacebook.currentUser.id)
    })

    friendship.set( "approved", true )


    friendship.save({}, {
      success: function () {
        target.friendships().add(friendship)
        this.render
      }.bind(this)
    });

    return false;
  },


  removeFriendship: function (e) {
    e.preventDefault();

    $( ".approve_friend" ).remove();
    $( ".deny_friend" ).remove();

    var target_id = $(e.currentTarget).attr('data')
    var target = this.collection.getOrFetch(target_id)

    var friendship = target.friendships().findWhere({
      user_id: parseInt(target_id),
      friend_id: parseInt(myfacebook.currentUser.id)
    })

    // if (friendship === undefined){
    //   var target = this.collection.findWhere({id: myfacebook.currentUser.id})
    //
    //   friendship = target.friendships().findWhere({
    //     user_id: parseInt(myfacebook.currentUser.id),
    //     friend_id: target_id
    //   });
    // };


    friendship.destroy({
      success: function () {

        this.renderPublic()
      }.bind(this)
    })
    return false;

  },




});
