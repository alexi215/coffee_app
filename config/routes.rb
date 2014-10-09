Rails.application.routes.draw do
  root 'welcome#index'
  post '/search' => 'welcome#search'
end
