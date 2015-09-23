class Post < ActiveRecord::Base
  belongs_to :user

  default_scope { order(:ord)}
end
