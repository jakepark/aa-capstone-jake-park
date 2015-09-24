Rails.application.routes.draw do
  # resources :friendships
  root to: 'static_pages#root'

  resource :session, only: [:new]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :index, :update]
    resources :posts, only: [:create, :update, :destroy, :index]
    resource :session, only: [:show, :create, :destroy]
    resources :friendships
  end

  get "/auth/:provider/callback", to: "api/sessions#omniauth"

end
