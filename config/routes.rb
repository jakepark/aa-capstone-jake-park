Rails.application.routes.draw do
  # resources :friendships
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :index, :update]
    resources :friendships

  end
end
