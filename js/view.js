const $title = document.querySelector("#title");
const $content = document.querySelector("#in_content");
const $date = document.querySelector("#date");
const nowDate = location.href.split('?')[1];
var bid = 0;
let bData;


$.ajax({
    url: `http://localhost:8082/board/getbydate?nowDate=${nowDate}`,
    type: 'GET',
    dataType: 'json',
    headers: {"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
    success:function(response){
        console.log(response);
        $title.innerHTML = "<h2>"+response.board.title+"</h2>";
        $content.innerHTML = response.board.content;
        $date.innerHTML = nowDate;
        bid = response.board.bid;
    }
})

document.querySelector('#modifyBtn').addEventListener('click', (e)=>{
    e.preventDefault();

    window.location = `/board/update?${nowDate}`;
})

function displayPhoto(response){
    var photolist = response.photolist;
    var content = response.board.content;
    content.split("")
}

document.querySelector('#listBtn').addEventListener('click', () =>{
    window.location = '/board/';
})

document.querySelector('#delBtn').addEventListener('click', ()=>{

$.ajax({
    url: `http://localhost:8082/board/delete/${bid}`,
    type: 'DELETE',
    dataType: 'json',
    headers: {"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
    success:function(response){
        console.log(response);
        window.location = "/board/";
    }
})
})