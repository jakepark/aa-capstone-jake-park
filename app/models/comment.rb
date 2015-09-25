class Comment < ActiveRecord::Base
  validates :body, :user_id, :post_id, :presence => true

  belongs_to :user
  belongs_to :post
  belongs_to :parent, class_name: "Comment", foreign_key: :parent_comment_id
  has_many :replies, class_name: "Comment", foreign_key: :parent_comment_id


  def self.reply_to_post(post, user, body)
    Comment.create!(
      :body => body,
      :user_id => user.id,
      :post_id => post.id,
      :parent_comment_id => nil)
  end

  def self.reply_to_comment(comment, user, body)
    Comment.create!(
      :body => body,
      :user_id => user.id,
      :post_id => comment.post_id,
      :parent_comment_id => comment.id)
  end
end
