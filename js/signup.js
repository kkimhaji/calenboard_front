let url = "http://localhost:8082/signup";

const $form = document.querySelector('#form');

$form.addEventListener('submit', ()=>{
    let sdata = new URLSearchParams();
    sdata.append('email', document.querySelector('[name="email"]').value);
    sdata.append('password', document.querySelector('[name="password"]').value);
    sdata.append('nickname', document.querySelector('[name="nickname"]').value)
    $.ajax({
        url: url,
        type: 'POST',
        data: sdata,
        dataType:'text',
        cache:false,
        contentType: false,
        processData: false,
        success: function (jqXHR){
            window.location.href = '/html/login';
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log(sdata);
            console.log(textStatus);
        }
    })
    
});


