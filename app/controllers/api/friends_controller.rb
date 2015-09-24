class Api::FriendsController < ApplicationController
  def index
    @friends = current_user.friends
    render json: @friends ## this gets me all the friends haha    
  end
end
