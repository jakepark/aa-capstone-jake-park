// JST['users/public']
//
//   var $profile_preview = $("<div>").addClass('user-public-info group')
//   var $profile_pic = $("<img>").addClass('profile_pic')
//     .attr('src', this.model.get('image_url'))
//   var $para = $("<p>").addClass("profile_name").text(this.model.escape('name_first')+ " " +
//     this.model.escape('name_last'))
//
//   $para.append($profile_pic)
//
//   <div class="user-public-info group">
//     <p class="profile_name">
//       <%= this.model.escape('name_first')%> <%=this.model.escape('name_last')%>
//     <img class="profile_pic" src= <%=this.model.escape('image_url')%> ></img>
//     </p>
//   </div>

<div class='user-show'>



    <div class="request_friend">
      <button>Add Friend</button>
    </div>

    <div class="approve_friend">
      <button>Approve Friend</button>
    </div>

    <div class="deny_friend">
      <button>Deny Friend</button>
    </div>

 Friends!<br>

  <div class="remove_friend">
    <button>Remove Friend</button>
  </div>




      <% if ((this.model.friends().findWhere({
        user_id: this.model.get('id'),
        friend_id: myfacebook.currentUser.get('id')
         }) === undefined)
          &&
         (this.model.friends().findWhere({
           user_id: myfacebook.currentUser.get('id'),
           friend_id: this.model.get('id')
         }) === undefined)
         &&
         (myfacebook.currentUser.friends().findWhere({
           user_id: this.model.get('id'),
           friend_id: myfacebook.currentUser.get('id')
         }) === undefined)
         &&
         (myfacebook.currentUser.friends().findWhere({
           user_id: myfacebook.currentUser.get('id'),
           friend_id: this.model.get('id')
         }) === undefined)
        )

         { %>

          <div class="request_friend">
            <button>Add Friend</button>
          </div>

        <% } else { %>



          <% if (this.model.friends().length !== 0 &&

                this.model.friends().findWhere({
                user_id: this.model.get('id'),
                friend_id: myfacebook.currentUser.get('id')})
                .get('approved') === false) { %>

                <div class="approve_friend">
                  <button>Approve Friend</button>
                </div>

                <div class="deny_friend">
                  <button>Deny Friend</button>
                </div>


          <% } else { %>
             Friends!<br>

              <div class="remove_friend">
                <button>Remove Friend</button>
              </div>
          <% } %>
      <% } %>

    <% } else { %>


    This is you!




      // !! DO NOT MESS WITH THE RENDER CODE !! //

        render: function () {
          var view = this.template({ user: this.model })

          var $profile_preview = $("<div>").addClass('user-public-info group')
          var $profile_pic = $("<img>").addClass('profile_pic')
            .attr('src', this.model.escape('image_url'))
          var $para = $("<p>").addClass("profile_name").text(this.model.escape('name_first')+ " " +
            this.model.escape('name_last'))

          $para.append($profile_pic)

          var first_name = this.model.escape('name_first')

          var $friend_auth = $("<p>").addClass('authorized')
            .text('Add ' + capitalizeFirstLetter(first_name) + ' as a friend to view more info.')

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

          $profile_preview.append($para).append($friend_auth)
            .append($avtr_form)  // magic

          this.$el.html($profile_preview).addClass("profile-main")

          // case d: dug and target are friends. delete friend. see profile.

          var d = this.model.friends().findWhere({
            id: myfacebook.currentUser.get('id')
          });

          if (this.model.get('id') !== myfacebook.currentUser.get('id')) {

          if (d) {
            this.$el.html(view)


            // appending posts to profile !
            var that = this;

            this.model.posts().forEach(function(post) {
              var $profile_post = $('<div>').addClass('profile-post')
              .text(post.get('body'))
              that.$el.append($profile_post)
            })

            this.$el.append(
            "<div class='remove_friend'><button>Remove Friend</button></div>"
            )

          } else {

            // case c: dug has already requested carl's friendship.

            var c = this.model.requests().findWhere({
              id: myfacebook.currentUser.get('id')
            });

            if (c) {

              // do nothing. seriously. actually, notify:
              this.$el.append(
              "<p class='request_sent'>Friend Request Sent.</p>"
              )

            } else {

                // case a: alpha has requested dug's friendship.

                var a = this.model.friendships().findWhere({
                  user_id: this.model.get('id'),
                  friend_id: myfacebook.currentUser.get('id')
                });

                if (a) { this.$el.append(
                  "<div class='approve_friend'><button>Approve Friend</button></div><div class='deny_friend'><button>Deny Friend</button></div>"
                )} else {

                // case b: dug and target have no friendship status. add friend.

                  this.$el.append("<div class='request_friend'><button>Add Friend</button></div>")
                }
              }
            }
          } else {      // this is your page

            this.$el.append(view)
            // appending posts to profile !
            var that = this;



            this.model.posts().forEach(function(post) {
              var $profile_post = $('<div>').addClass('profile-post group').text(post.get('body'))

              var $delete_post = $('<div>').addClass('delete_post')
              var $delete_button = $('<button>').attr('data', post.get('id')).text('Delete')
              that.$('div.posts').append($profile_post.append($delete_post.append($delete_button)))
            })

          }
