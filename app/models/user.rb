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

end
