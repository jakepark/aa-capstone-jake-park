json.friends_posts @user.friends_posts do |post|
  json.extract! post, :id, :user_id, :body, :ord, :created_at, :updated_at
end

# json.posts @user.posts do |post|
#   json.extract! post, :id, :user_id, :body, :ord, :created_at, :updated_at
#
# end
