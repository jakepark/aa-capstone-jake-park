Rails.application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session

  namespace :api, defaults: { format: :json } do
    resources :users, except: [:new]

  end
end
