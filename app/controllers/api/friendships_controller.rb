class Api::FriendshipsController < ApplicationController
  def show
    @friendship = Friendship.find(friendship_params[:id])

    if @friendship
      render :show
    else
      render json: ["User doesn't exist."], status: 422
    end
  end

  def index
    @friendships = Friendship.all
        render json: @users
  end


  private
    
    def friendship_params
      params.require(:friendship).permit(:user_id, :friend_id, :approved)
    end
end
