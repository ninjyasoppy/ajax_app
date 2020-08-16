function check() {//投稿のDOMを取得している
  const posts = document.getElementsByClassName("post"); //クリックされる部分の要素を取得
                 //HTMLcollectionに対してforEachが使えない
  postsA = Array.from(posts);     //引数で渡したオブジェクトを配列に変換して返す,取得したDOMを配列に変換している

  postsA.forEach(function (post) {  //配列の要素1つずつに対して、「クリック」した際に動作する処理を記述
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", (e) => {// 投稿をクリックした場合に実行する処理を定義している
      const postId = post.getAttribute("data-id");//属性値を取得、メモのidを取得
      const XHR = new XMLHttpRequest();//XMLHttpRequestを使用してオブジェクトを生成
      XHR.open("GET", `/posts/${postId}`, true);//HTTPメソッドの指定,パスの指定,非同期通信のON/OFF
      XHR.responseType = "json";//レスポンスとして欲しい情報の形式を指定
      XHR.send();//sendメソッドを記述することで、はじめてリクエストが行える
      XHR.onload = () => {//レスポンスなどの受信が成功した場合に呼び出されるイベントハンドラー
        const item = XHR.response.post;//XHR.responseでレスポンスされてきたJSONにアクセス
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
        if (XHR.status != 200) {//レスポンスが存在しないなど何かしらの不具合があった場合に返却されるコード
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      }
      XHR.onerror = () => {// リクエストが送信できなかった時
        alert("Request failed");
      };
      e.preventDefault();// イベントをキャンセルして、処理が重複しないようにしている
    });
  });
}
setInterval(check, 1000);//一定の間隔（時間）ごとに指定した関数などを実行できるメソッド
window.addEventListener("load", check);  //window（ページ）をload（読み込んだ時）に実行