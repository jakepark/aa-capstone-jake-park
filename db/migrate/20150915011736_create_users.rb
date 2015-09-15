class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :user_fname, null: false
      t.string :user_lname, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.text :avatar_url
      t.string :birth_date
      t.string :birth_year
      t.string :gender

      t.timestamps
    end

    add_index :users, :session_token, :unique => true
    add_index :users, :email, :unique => true
  end
end
