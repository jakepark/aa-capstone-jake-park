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
//   <div class="user-public-info-group">
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




  This is you!
  <% if (user.get('image_url') === 'default_profile.jpg') { %>

// ask to save new avatar photo.

<form class="avatar">
  <input type="file" class="hidden" name="user[image]" id="input-user-avatar"/> <br>
    <label class="button-avatar-select" for="input-user-avatar">New Avatar</label>
    <img src="" id="preview-post-image" width="50"> <br>
  <button>Save</button> or <a href="#">Cancel</a>
</form><br>

  <% } %>

<% } %><br>

<%= user.escape('name_first') %> <%= user.escape('name_last') %>
  <br>
    <img src="<%= user.get("image_url") %>" width="100px">
  <br>

  Birth Date:
    <%= user.escape('birth_month') %>
    <%= user.escape('birth_day') %>
    <%= user.escape('birth_year') %>
    <br>
  Gender:
    <%= user.escape('gender') %>
    <br>



</div>

<div class='lists-window'>
  <div id="lists">
  </div>

  <div id="list-form">
  </div>
</div>
