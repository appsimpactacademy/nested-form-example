Rails.application.routes.draw do
  resources :projects do
    resources :tasks, only: [:create, :destroy]
  end
  root "projects#index"
end
