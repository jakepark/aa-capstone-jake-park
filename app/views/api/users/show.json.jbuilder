
json.extract! @user, :id, :name_last, :name_first,
  :birth_month, :birth_day, :birth_year, :gender

json.image_url asset_path(@user.profile_pic.url(:original))
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
