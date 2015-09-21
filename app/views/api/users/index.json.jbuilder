json.array! @users do |user|
  json.extract! user, :id, :name_first, :name_last
  json.image_url (user.avatar.url(:original))
end
