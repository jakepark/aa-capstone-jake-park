json.array! @friends_posts do |friends_post|
  json.extract! friends_post, :posts_id, :user_id, :body, :ord, :created_at, :updated_at
end

# json.posts @user.posts do |post|
#   json.extract! post, :id, :user_id, :body, :ord, :created_at, :updated_at
#
# end
