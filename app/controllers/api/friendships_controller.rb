class Api::FriendshipsController < ApplicationController
  before_action :set_friendship, only: [:show, :edit, :update, :destroy]

  # GET /friendships
  # GET /friendships.json

  def index
    @friendships = Friendship.all
    render json: @friendships
  end


  # GET /friendships/1
  # GET /friendships/1.json
  def show
    @friendship = Friendship.find(friendship_params[:id])

    if @friendship
      render :show
    else
      render json: ["Friendship doesn't exist."], status: 422
    end
  end


  # GET /friendships/new
  def new
    @friendship = Friendship.new
  end

  # GET /friendships/1/edit
  def edit
  end

  # POST /friendships
  # POST /friendships.json
  def create
    @friendship = current_user.friendships.build(friend_id: friendship_params[:friend_id], approved: "false")


    if @friendship.save
      render :show
    end
  end

  # PATCH/PUT /friendships/1
  # PATCH/PUT /friendships/1.json
  def update
    @friendship = Friendship.find(params[:id])
    if @friendship.update_attributes(friendship_params)
      render :show
    end
  end

  # DELETE /friendships/1
  # DELETE /friendships/1.json
  def destroy

    @friendship = Friendship.find(params[:id])
    @friendship.destroy!
    render json: {}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_friendship
      @friendship = Friendship.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def friendship_params
      params.require(:friendship).permit(:user_id, :friend_id, :approved)
    end
end
