class Profile < ActiveRecord::Base
  validates :title, :user, presence: true

  belongs_to :user

  # has_many :board_memberships, dependent: :destroy, inverse_of: :board
  # has_many :members, through: :board_memberships, source: :user

  # def is_member?(u)
  #   return true if u.id == self.user_id
  #   board_memberships.where(user_id: u.id).exists?
  # end
end
