Rails.application.routes.draw do
 root to: 'posts#index'
 post 'posts', to: 'posts#create'
 get 'posts/:id', to: 'posts#checked'  #既読機能のエンドポイントを、pathパラメーターを使用
end