
json.extract! @user, :id, :name_last, :name_first,
  :birth_month, :birth_day, :birth_year, :gender

json.friendships @user.friendships do |friendship|
  json.id friendship.id

end

json.image_url (@user.avatar.url(:original))
