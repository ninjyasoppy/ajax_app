class PostsController < ApplicationController

  def index
    @posts = Post.all.order(id: "DESC")
  end
  
  def create
    post = Post.create(content: params[:content], checked: false)
    render json:{ post: post }#Ajaxを実現するため,レスポンスをJSONに変更した
  end

  def checked
    post = Post.find(params[:id])#URLパラメーターから、既読したメモのidが渡される
    if post.checked then
      post.update(checked: false)#既読していれば「既読を解除するためにfalseへ変更」
    else                  #updateというActiveRecordのメソッドを使用して更新
      post.update(checked: true)#既読していなければ「既読にするためtrueへ変更」
    end
    item = Post.find(params[:id])  #更新したレコードを取得し直す
    render json: { post: item }  #JSON形式（データ）としてchecked.jsに返却
  end
end