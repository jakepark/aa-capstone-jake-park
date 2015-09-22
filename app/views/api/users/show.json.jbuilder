
json.extract! @user, :id, :name_last, :name_first,
  :birth_month, :birth_day, :birth_year, :gender

# json.requested_friendships do
#   json.partial!  'api/users/user', user: @user.requested_friendships
# end

json.friendships @user.friendships do |friendship|
  json.id friendship.id
  json.user_id friendship.user_id
  json.friend_id friendship.friend_id
  json.approved friendship.approved
end

json.requested_friendships do
  json.array! @user.requested_friendships do |request|
    json.extract! request, :id, :name_first, :name_last
  end
end

json.image_url (@user.avatar.url(:original))
