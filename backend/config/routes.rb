Rails.application.routes.draw do
  resources :scenes
  resources :game_objects
  resources :animations
  resources :sprites
  resources :users

  post "/login", to: "sessions#login"
  delete "/logout", to: "sessions#logout"
end
