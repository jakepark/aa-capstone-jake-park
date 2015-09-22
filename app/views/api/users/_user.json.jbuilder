# USED BY BACKBONE TO PASS ATTRS TO CURRENT USER SOMEHOW
json.(user, :id, :email, :name_first, :name_last ) # added for BB auth


json.extract! user, :id, :name_last, :name_first,
  :birth_month, :birth_day, :birth_year, :gender

json.friendships user.friendships do |friendship|
  json.id friendship.id
  json.user_id friendship.user_id
  json.friend_id friendship.friend_id
  json.approved friendship.approved
end

json.requested_friendships do
  json.array! user.requested_friendships do |request|
    json.extract! request, :id, :name_first, :name_last
  end
end


json.image_url (user.avatar.url(:original))   # need this for BB auth image
