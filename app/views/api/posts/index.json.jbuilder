json.array! @posts do |post|
  json.extract! post, :id, :user_id, :body, :ord
  # json.image_url (post.avatar.url(:original))
end
