class Api::FriendsController < ApplicationController
  def index

    @friends = current_user.friends
      # .includes(posts: :comments)
      # .includes(:requested_friendships)
#    render json: @friends ## this gets me all the friends haha   .. works.

    render :index
  end



end


# def index
#
#   @friends = current_user.friends
#     # .includes(posts: :comments)
#     # .includes(:requested_friendships)
# #    render json: @friends ## this gets me all the friends haha   .. works.
#
#   render :index
# end


# def friends
#   User.find_by_sql(<<-SQL)
#
#     -- *, users.id AS users_id, users.user_id AS author_id, users.created_at AS users_created_at
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
