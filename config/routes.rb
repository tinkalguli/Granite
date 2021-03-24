Rails.application.routes.draw do
  resources :tasks, except: %i[new edit]
  resources :users, only: %i[create index]

  root "home#index"
  get '*path', to: 'home#index', via: :all
end
