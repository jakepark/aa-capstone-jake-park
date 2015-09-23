class Api::PostsController < ApplicationController
  before_action :require_signed_in!

  def create
    @post = current_user.posts.new(post_params)

    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages,
             status: :unprocessable_entity
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
    params.require(:post).permit(:user_id, :ord, :description)
  end
end
end
