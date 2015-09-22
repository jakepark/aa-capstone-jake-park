# Schema
# create_table "users", force: :cascade do |t|
#   t.string   "email",           null: false
#   t.string   "name_first",      null: false
#   t.string   "name_last",       null: false
#   t.string   "password_digest", null: false
#   t.string   "session_token",   null: false

#   t.string   "birth_date"
#   t.string   "birth_year"
#   t.string   "gender"
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end
#
#   add_index :users, :email, :unique => true

class User < ActiveRecord::Base
  validates :email, :password_digest, :name_first,
    :name_last, :session_token, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }
  validates :email, uniqueness: true

  has_many :friendships
  has_many :passive_friendships,
    class_name: "Friendship",
    foreign_key: :friend_id

  has_many :active_friends, -> { where(friendships: { approved: true}) },
    :through => :friendships, :source => :friend
  has_many :passive_friends, -> { where(friendships: { approved: true}) },
    :through => :passive_friendships, :source => :user
  has_many :pending_friends, -> { where(friendships: { approved: false}) },        # dug has offered friendships to carl
    :through => :friendships, :source => :friend
  has_many :requested_friendships, -> { where(friendships: { approved: false}) },  # dug has requested friendships from alpha
    :through => :passive_friendships, :source => :user

  has_attached_file :avatar, default_url: "default_profile.jpg"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/


  def friends
    active_friends | passive_friends
  end

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
