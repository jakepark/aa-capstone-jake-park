Rails.application.routes.draw do
  # resources :friendships
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :index, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :friendships

  end
end
