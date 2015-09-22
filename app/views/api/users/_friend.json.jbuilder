# json.(post, :id, :title, :created_at, :updated_at)

json.extract! user, :id, :name_last, :name_first,
  :birth_month, :birth_day, :birth_year, :gender

# json.friendships user.friendships do |friendship|
#   json.id friendship.id
#   json.user_id friendship.user_id
#   json.friend_id friendship.friend_id
#   json.approved friendship.approved
# end
#
# json.image_url (user.avatar.url(:original))
