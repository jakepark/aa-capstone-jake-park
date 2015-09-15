# ## relationships
# column name | data type | details
# ------------|-----------|-----------------------
# user_id     | integer   | not null, foreign key (references users)
# friend_id   | integer   | not null, foreign key (references users)
# status      | string    | not null, foreign key (references users)
# action_user | integer   | not null, foreign key (references users)

class CreateRelationships < ActiveRecord::Migration
  def change
    create table :relationships do |t|
      t.integer :follower_id, null: false
      t.integer :followed_id, null: false

      t.timestamps
    end

    add_index :relationships, :follower_id
    add_index :relationships, :followed_id
    add_index :relationships, [:follower_id, :followed_id], unique: true
  end
end
