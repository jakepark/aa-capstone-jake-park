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

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  def friends
    active_friends | passive_friends

  end

  # def friends
  #   User.find_by_sql(<<-SQL)
  #
  #
  #     SELECT
  #     *
  #     FROM
  #     users
  #     JOIN
  #     friendships
  #     ON
  #     users.id = friendships.user_id
  #     WHERE
  #       (friendships.approved = true)
  #         AND
  #         ((friendships.friend_id = #{self.id})
  #           OR
  #         (friendships.user_id = #{self.id}))
  #   SQL
  # end


# DO NOT TRY TO REFACTOR THIS. ENTRIES ARE ONLY ENTERED ONCE IN THE DATABASE

  def friends_posts
    Post.find_by_sql(<<-SQL)

      SELECT
      *, posts.id AS posts_id, posts.user_id AS author_id, posts.created_at AS posts_created_at
      FROM
      posts
      JOIN
      friendships
      ON
      posts.user_id = friendships.user_id
      WHERE
      ((posts.user_id != #{self.id} AND friendships.approved = true)
      AND
      (friendships.friend_id = #{self.id}))
      OR
      ((posts.user_id != #{self.id} AND friendships.approved = true)
      AND
      (friendships.user_id = #{self.id}))
      UNION ALL
      SELECT
      *, posts.id AS posts_id, posts.user_id AS author_id, posts.created_at AS posts_created_at
      FROM
      posts
      JOIN
      friendships
      ON
      posts.user_id = friendships.friend_id
      WHERE
      ((posts.user_id != #{self.id} AND friendships.approved = true)
      AND
      (friendships.user_id = #{self.id}))
      OR
      ((posts.user_id != #{self.id} AND friendships.approved = true)
      AND
      (friendships.friend_id = #{self.id}))
  SQL
end

# SELECT * FROM posts WHERE posts.user_id = #{self.id}

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


  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid])

    unless user
      user = User.create!(
        provider: auth_hash[:provider],
        uid: auth_hash[:uid],
        name_first: auth_hash[:info][:name].split.first,
        name_last: auth_hash[:info][:name].split.last,
        email: "#{auth_hash[:info][:nickname]}@#{auth_hash[:provider]}.com",
        password: SecureRandom::urlsafe_base64
      )
    end

    user
  end


  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
