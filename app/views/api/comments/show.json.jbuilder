# json.posts @user.posts do |post|
#   json.extract! post, :id, :user_id, :body, :ord, :created_at, :updated_at
#
#   json.comments post.comments do |comment|
#     json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
#   end
#
# end
#
#
# json.comments @user.comments do |comment|
#   json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
# end

json.extract! @comment, :id, :post_id, :user_id, :body, :created_at, :updated_at
