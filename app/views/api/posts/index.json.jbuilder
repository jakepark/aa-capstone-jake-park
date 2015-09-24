json.array! @friends do |friend|
  json.extract! friend, :id, :user_id, :body, :ord
  # json.image_url (post.avatar.url(:original))
end


# json.posts @user.posts do |post|
#   json.extract! post, :id, :user_id, :body, :ord, :created_at, :updated_at
#
# end
