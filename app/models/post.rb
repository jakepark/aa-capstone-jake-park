class Post < ActiveRecord::Base
  validates :, :user, :ord, presence: true

  belongs_to :user
  # has_many :comments, dependent: :destroy # not yet!

  default_scope { order(:ord)}
end
