Rails.application.routes.draw do
 root to: 'posts#index'
 post 'posts', to: 'posts#create'
 get 'posts', to: 'posts#checked'#メモのidを取得できるようにルーティングに設定
end