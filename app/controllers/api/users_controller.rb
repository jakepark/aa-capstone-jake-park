class Api::UsersController < ApplicationController
  wrap_parameters false

  def show
    @user = User.includes(:friendships).find(params[:id])

    if @user
      render :show
    else
      render json: ["User doesn't exist."], status: 404
    end
  end

  def index

    @users = User.order(:name_first)
    render json: @users
  end


  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
    render :show
  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :name_first, :name_last,
      :birth_month, :birth_day, :birth_year, :gender, :avatar)
  end
end
