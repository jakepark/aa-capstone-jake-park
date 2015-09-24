class Api::PostsController < ApplicationController
  # before_action :require_signed_in!

  # def index
  #
  #   @users = User.order(:name_first)
  #   render :index
  # end

  def index
    # @friends = current_user.friends
    # render json: @friends ## this gets me all the friends haha

    @posts = current_user.posts
    render :index
  end

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: {}
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  private

  # def current_user
  #   if params[:id]
  #     @post = Post.find(params[:id])
  #     @user = @post.user
  #   elsif params[:post]
  #     @user = user.find(params[:post][:user_id])
  #   end
  # end

  # def current_board
  #   .board
  # end

  def post_params
    params.require(:post).permit(:user_id, :ord, :body)
  end
end
