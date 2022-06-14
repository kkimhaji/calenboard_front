let url = "http://localhost:8082/board/post";
const $form = document.querySelector('#btn');
const nowDate = location.href.split('?')[1];
const $content = document.querySelector('#content_box');
const $title = document.querySelector('#title');
const $date = document.querySelector('#date');

$date.value = nowDate;

const $inputBtn = document.querySelector('.input_btn');

$inputBtn.addEventListener('change', ()=>{
    const imgSrc = URL.createObjectURL($inputBtn.files[0]);
    $content.innerHTML += `<img class="inputimg" src="${imgSrc}"/>`

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
    formData.append('content',$content.innerHTML );

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        cache:false,
        enctype:"multipart/form-data",
        dataType:'json',
        headers:{"X-AUTH-TOKEN": sessionStorage.getItem("X-AUTH-TOKEN")},
        success: function(result){
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