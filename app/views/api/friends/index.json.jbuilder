json.array! @friends do |friend|
  json.extract! friend, :id, :name_first, :name_last
  json.image_url (friend.avatar.url(:original))

  json.posts friend.posts do |post|
    json.extract! post, :id, :user_id, :body, :ord, :created_at, :updated_at

    json.comments post.comments do |comment|
      json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
    end

  end


  json.comments friend.comments do |comment|
    json.extract! comment, :id, :body, :user_id, :post_id, :created_at, :updated_at
  end

end
