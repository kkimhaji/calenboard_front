let url = "http://localhost:8082/board/update";
const $form = document.querySelector('#btn');
const nowDate = location.href.split('?')[1];
const $content = document.querySelector('#content_box');
const $title = document.querySelector('#title');
const $date = document.querySelector('#date');
var bid = 0;
$date.value = nowDate;

const $inputBtn = document.querySelector('#input_btn');

$inputBtn.addEventListener('change', ()=>{
    const imgSrc = URL.createObjectURL($inputBtn.files[0]);
    for (let i = 0; i < $inputBtn.files.length; i++) {
        const file = $inputBtn.files[i];
        const imgSrc = URL.createObjectURL(file);
        $content.innerHTML += `<img src="${imgSrc}"/>`
    }
})

$.ajax({
    url: `http://localhost:8082/board/getbydate?nowDate=${nowDate}`,
    type: 'GET',
    dataType: 'json',
    headers: {"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
    success:function(response){
        console.log(response);
        $title.value = response.board.title;
        $content.innerHTML = response.board.content;
        $date.value = nowDate;
        bid = response.board.bid;
    }
})

$form.addEventListener('click', (e)=>{
    e.preventDefault();
    let sdata = new URLSearchParams();

    var formData = new FormData();
    var inputFile = $("input[type='file']");

    var files = inputFile[0].files;

    for(var i=0;i<files.length;i++){
        formData.append('uploadFiles', files[i]);
    }

    formData.append('title', $title.value);
    formData.append('date', $date.value);
    formData.append('content',$content.innerHTML);
    formData.append('bid', bid);

    $.ajax({
        url: url,
        type: 'PUT',
        data: formData,
        processData: false,
        contentType: false,
        cache:false,
        enctype:"multipart/form-data",
        dataType:'json',
        headers:{"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
        success: function(result){
            console.log(result);
            window.location = `/board/view?${nowDate}`;
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(formData.toString());

            sdata.forEach(function(value, key){
                console.log(value, key);
            })
            console.log(textStatus);
        }
    })
})

document.querySelector('#listBtn').addEventListener('click', () =>{
    window.location = '/board/';
})