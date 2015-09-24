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

DELETE posts DONE
UPDATE posts NEXT TIME

CSS styling. REDID SOME NESTED DIVS

.data(post.get('id'))


<form class="post-form">
  <ul class="errors">
  </ul>
    <textarea name="body"></textarea>

  <input type="submit">
</form>




<div class="approve_friend">
  <button>Approve Friend</button>
</div>

<div class="deny_friend">
  <button>Deny Friend</button>
</div>

 <p class='request_sent'>Friend Request Sent.</p>


<div class="add_friend">
  <button>Add Friend</button>
</div>
