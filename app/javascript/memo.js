function memo() {
  const submit = document.getElementById("submit");//投稿ボタンID取得
  submit.addEventListener("click", (e) => {//「click」した場合に実行される関数を定義
    const formData = new FormData(document.getElementById("form"));//フォームで入力された値を取得できるオブジェクトのこと
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);//エンドポイントにメモ投稿の内容を送信できました
    XHR.onload = () => {
      const item = XHR.response.post;//レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");//HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得
      const formText = document.getElementById("content");//「メモの入力フォーム」
      //「メモとして描画する部分のHTML」を定義
      const HTML = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
      list.insertAdjacentHTML("afterend", HTML);//insertAdjacentHTMLでHTMLを追加,第一引数にafterendを指定することで、listの要素直後に挿入

      formText.value = "";

      if (XHR.status != 200) {//200以外のHTTPステータスが返却された場合の処理
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      } else {
        return null;
      }
    };
    XHR.onerror = function () {
      alert("Request failed");
    };
    e.preventDefault();
  })
}
window.addEventListener("load", memo);