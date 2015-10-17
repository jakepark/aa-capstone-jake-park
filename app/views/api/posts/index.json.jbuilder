json.array! @friends_posts do |friends_post|
  json.extract! friends_post, :posts_id, :author_id, :body, :ord, :posts_created_at

  # json.comments friends_post.comments do |comment|
  #   json.extract! comment, :id, :body, :user_id, :post_id, :parent_comment_id, :created_at, :updated_at
  # end
end

# json.array! @posts do |post|
#   json.extract! post, :posts_id, :author_id, :body, :ord, :posts_created_at
#
#   json.comments post.comments do |comment|
#     json.extract! comment, :id, :body, :user_id, :post_id, :parent_comment_id, :created_at, :updated_at
#   end
# end


# works prior to adding comments.
# json.array! @friends_posts do |friends_post|
#   json.extract! friends_post, :posts_id, :author_id, :body, :ord, :posts_created_at
# end


# json.array! @friends_posts do |friends_post|
#   json.extract! friends_post, :posts_id, :author_id, :body, :ord, :posts_created_at
#
#   json.comments friends_post.comments do |comment|
#     json.extract! comment, :id, :title, :ord, :created_at, :updated_at
#   end
# end
