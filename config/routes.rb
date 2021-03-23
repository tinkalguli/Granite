Rails.application.routes.draw do
  resources :tasks, only: [:index, :create]
  resources :tasks, except: %i[new edit]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
