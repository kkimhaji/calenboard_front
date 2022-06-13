let url = "http://localhost:8082/board/post";
const $form = document.querySelector('#form');
const nowDate = location.href.split('?')[1];

const $date = document.querySelector('#date');

$date.value = nowDate;

$form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let sdata = new URLSearchParams();

    var formData = new FormData($form);
    var inputFile = $("input[type='file']");

    var files = inputFile[0].files;
    // var date = document.querySelector('#date').value;
    
    // const body = {
    //     "content": document.querySelector('#content').value,
    //     "title": document.querySelector('#title').value,
    //     "date": date
    // }

    // sdata.append("boardDTO", JSON.stringify(body));
    // console.log("sdata: ", sdata[0]);

    // for(var i=0;i<files.length;i++){
    //     formData.append("uploadFiles", files[i]);
    //     console.log(files[i]);
    // }

    sdata.append("uploadFiles", formData);

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
            console.log(result);
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