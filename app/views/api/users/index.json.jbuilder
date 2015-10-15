json.array! @users do |user|
  json.extract! user, :id, :name_first, :name_last
  json.image_url (user.avatar.url(:original))



  json.friends user.friends do |friend|
    json.extract! friend, :id, :email, :name_first, :name_last
    json.image_url asset_path(friend.avatar.url(:original))
  end
end
