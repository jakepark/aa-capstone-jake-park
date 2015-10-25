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
#   @friends = current_user.friends
#   render json: @friends ## this gets me all the friends haha   .. works.
# end
