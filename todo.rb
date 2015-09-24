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



<% this.model.posts().each(function(post) {
  <div class = "profile-post">
    <%= post.get('body') %>
  </div>
}) %>

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
