class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :name_first, null: false
      t.string :name_last, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.text :avatar_url
      t.string :birth_date
      t.string :birth_year
      t.string :gender

      t.timestamps
    end

    add_index :users, :email, :unique => true
  end
end
