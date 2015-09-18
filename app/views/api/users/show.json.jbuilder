
json.extract! @user, :id, :name_last, :name_first,
  :birth_month, :birth_day, :birth_year, :gender

json.friends @user.friends do |friend|
  json.id friend.id
  json.email friend.email
end

json.image_url (@user.avatar.url(:original))
