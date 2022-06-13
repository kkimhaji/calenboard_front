const $title = document.querySelector("#title");
const $content = document.querySelector("#content");
const $date = document.querySelector("#date");
const nowDate = location.href.split('?')[1];

$.ajax({
    url: `http://localhost:8082/board/getbydate?nowDate=${nowDate}`,
    type: 'GET',
    dataType: 'json',
    headers: {"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
    success:function(response){
        console.log(response);
        $title.innerHTML = "<h3>"+response.title+"</h3>";
        $content.innerHTML = response.content;
        $date.innerHTML = nowDate;
    }
})