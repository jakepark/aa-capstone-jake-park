class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.integer :user_id, null: false
      t.text :description
      t.float :ord, default: 0

      t.timestamps
    end

    add_index :posts, :user_id
  end
end
