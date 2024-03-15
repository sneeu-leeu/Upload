Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :folders, only: [:index, :create, :show, :destroy] do
        resources :uploads, only: [:index, :create, :show, :destroy] do 
          resources :comments, only: [:create, :index]
        end
      end
      resources :comments, only: [] do
        resources :comments, only: [:create, :index]
      end
    end
  end

  # Defines the root path route ("/")
  root "home#index"

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
end
