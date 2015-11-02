myfacebook.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],

  initialize: function (options) {
    this.collection = options.collection
    this.friendships = options.friendships;

    this.listenTo(this.currentUser, 'add update remove', this.render)
    this.listenToOnce(this.collection, 'sync add update remove', this.render)
    this.listenToOnce(this.friendships, 'sync add update remove', this.render)

  },

  events: {
    "click .add_friend": "createFriendship",
    "click .approve_friend": "approveFriendship",
    "click .deny_friend": "removeFriendship",
    "click .remove_friend": "removeFriendship",
  },


  render: function () {

    var view = this.template({
      users: this.collection,
      friendships: this.friendships
    })
    this.$el.html(view).addClass('content-container group');
    return this;
  },

  createFriendship: function (e) {
    e.preventDefault();
    $( ".add_friend" ).remove();


    var target_id = $(e.currentTarget).attr('data')
    var target = this.collection.getOrFetch(target_id)

    var friendship = new myfacebook.Models.Friendship()
    friendship.set({
      user_id: parseInt(myfacebook.currentUser.id),
      friend_id: parseInt(target_id)
    })

    friendship.save();
    target.fetch({
      success: function(){
          this.render();
      }.bind(this)
    });
    // friendship.save({
    //   success: function () {
    //
    //     this.render()
    //   }.bind(this)
    // })

    return false;
  },

  approveFriendship: function (e) {
    e.preventDefault();

    $( ".approve_friend" ).remove();
    $( ".deny_friend" ).remove();

    var target_id = $(e.currentTarget).attr('data')
    var target = this.collection.getOrFetch(target_id)

    var friendship = this.friendships.findWhere({
      user_id: parseInt(target_id),
      friend_id: parseInt(myfacebook.currentUser.id)
    })
    if (friendship === undefined) {
      friendship = this.friendships.findWhere({
        user_id: parseInt(myfacebook.currentUser.id),
        friend_id: parseInt(target_id)
      })
    }

    friendship.set( "approved", true )
    this.friendships.fetch();
    friendship.save();
    target.fetch({
      success: function(){
          this.render();
      }.bind(this)
    });
    // friendship.save({}, {
    //   success: function () {
    //     target.friendships().add(friendship)
    //     this.render
    //   }.bind(this)
    // });

    return false;
  },


  removeFriendship: function (e) {
    e.preventDefault();
    $( ".approve_friend" ).remove();
    $( ".deny_friend" ).remove();

    var target_id = $(e.currentTarget).attr('data')
    var target = this.collection.getOrFetch(target_id)
    

    var friendship = this.friendships.findWhere({
      user_id: parseInt(target_id),
      friend_id: parseInt(myfacebook.currentUser.id)
    })
    if (friendship === undefined) {
      friendship = this.friendships.findWhere({
        user_id: parseInt(myfacebook.currentUser.id),
        friend_id: parseInt(target_id)
      })
    }

    this.friendships.remove(friendship)
    friendship.destroy();
    this.friendships.fetch();

    target.fetch({
      success: function(){
          this.render();
      }.bind(this)
    });
    // friendship.destroy({
    //   success: function () {
    //
    //     this.render()
    //   }.bind(this)
    // })
    return false;

  },




});
