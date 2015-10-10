class UsersController < ApplicationController
  def new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end



  private

  def user_params
    params.require(:user).permit(:email, :password, :name_first, :name_last,
      :birth_month, :birth_day, :birth_year, :gender)
  end
end
