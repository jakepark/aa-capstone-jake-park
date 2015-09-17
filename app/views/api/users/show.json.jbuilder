
json.extract! @user, :id, :name_last, :name_first, :avatar_url,
  :birth_month, :birth_day, :birth_year, :gender

# @user.friends do
#   json.array!(user.friends) do |friend|
#     json.partial! 'friend', friend: friend
#   end
# end

# this doesn't break!
#
# @user.friendships do |friend|
#   json.array!(@user.friendships) do |friend|
#     # json.partial! 'friend', friend: friend
#   end
# end
