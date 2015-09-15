class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :id, null: false
      t.string :user_fname, null: false
      t.string :user_lname, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.text :avatar_url, null: false
      t.string :birth_date, null: false
      t.string :birth_year, null: false
      t.string :gender, null: false

      t.timestamps
    end

    add_index :users, :session_token, :unique => true
    add_index :users, :email, :unique => true
  end
end
