json.array! @users do |user|
  json.extract! user, :id, :name_first, :name_last
  json.image_url (user.avatar.url(:original))



  json.friends user.friends do |friend|
    json.extract! friend, :id, :email, :name_first, :name_last
    json.image_url asset_path(friend.avatar.url(:original))
  end

  json.friendships user.friendships do |friendship|
    json.extract! friendship, :id, :user_id, :friend_id, :approved
  end

  json.requests user.requested_friendships do |request|
    json.extract! request, :id, :name_first, :name_last
  end

end
