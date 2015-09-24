git config --local user.name 'Jake Park'
git config --local user.email 'jake.park@caa.columbia.edu'

fix api/users displaying all the things  -- FIXED


http://stackoverflow.com/questions/16001586/change-the-no-file-chosen

# <form action="/api/#{current_user.id}">
#   <li><input class: "button_user_home" type="submit" value="Home" > </li>
# </form>

http://stackoverflow.com/questions/18721054/link-with-2-lines-text-and-image

BUGS!

When friend approve button is clicked, the page doesnt refresh.
When new user signs up, a blank entity is added to the index of users. However,
hard page refresh fixes problem.

CREATE is done..

DELETE posts
UPDATE posts

Posts are visible ..


<div class='user-show'>
  <div class='user-info group'>

  <% if (user.id !== myfacebook.currentUser.id) { %>
    <p class="profile_name">
  <img class = "profile_pic_main" src="<%= user.get("image_url") %>" width="100px">
  <%= user.escape('name_first') %> <%= user.escape('name_last') %></p>

  <% } %>

  <br>Birth Date: <%= user.escape('birth_month') %>
    <%= user.escape('birth_day') %>
    <%= user.escape('birth_year') %><br>Gender: <%= user.escape('gender') %> <br>


  </div>
</div>
