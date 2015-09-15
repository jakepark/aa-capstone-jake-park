# Schema
# create_table "users", force: :cascade do |t|
#   t.string   "email",           null: false
#   t.string   "user_fname",      null: false
#   t.string   "user_lname",      null: false
#   t.string   "password_digest", null: false
#   t.string   "session_token",   null: false
#   t.text     "avatar_url"
#   t.string   "birth_date"
#   t.string   "birth_year"
#   t.string   "gender"
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end
#
#   add_index :users, :session_token, :unique => true
#   add_index :users, :email, :unique => true

class User < ActiveRecord::Base
  validates :email, :user_fname, :user_lname, :session_token, presence: true
  validates :password, length: { minimum: 8, allow_nil: true }
  validates :email, uniqueness: true

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
