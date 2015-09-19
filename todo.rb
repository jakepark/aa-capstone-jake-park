git config --local user.name 'Jake Park'
git config --local user.email 'jake.park@caa.columbia.edu'

fix api/users displaying all the things

# <form action="/api/#{current_user.id}">
#   <li><input class: "button_user_home" type="submit" value="Home" > </li>
# </form>

http://stackoverflow.com/questions/18721054/link-with-2-lines-text-and-image


<% unless current_user == @user %>
      <%= link_to "Add Friend", friendships_path(:friend_id => @user), :method => :post %>
  <% end %>

  <h4>Friends</h4>
  <ul>
      <% @user.friends.each do |friend| %>
      <li>
        <%= friend.email %>
        <% if current_user == @user %>
          <%= link_to "Remove", friendship_path(:id => friend), :method => :delete %>
        <% end %>
      </li>
    <% end %>
  </ul>

  <% if current_user == @user %>
      <h4>Friend Requests</h4>
      <ul>
          <% @user.requested_friendships.each do |request| %>
          <li>
            <%= request.email %>
            <%= link_to "Accept", friendship_path(:id => request), :method => "put" %>
            <%= link_to "Decline", friendship_path(:id => request), :method => :delete %>
          </li>
        <% end %>
      </ul>
  <% end %>
