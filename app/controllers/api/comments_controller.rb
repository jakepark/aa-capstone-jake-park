class Api::CommentsController < ApplicationController
  # before_action :require_signed_in!

  def create

    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render json: {}
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update_attributes(comment_params)
      render json: @comment
    else
      render json: @comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  private

  # def current_user
  #   if params[:id]
  #     @comment = Comment.find(params[:id])
  #     @user = @comment.user
  #   elsif params[:comment]
  #     @user = user.find(params[:comment][:user_id])
  #   end
  # end

  # def current_board
  #   .board
  # end

  def comment_params
    params.require(:comment).permit(:user_id, :post_id, :body)
  end
end
