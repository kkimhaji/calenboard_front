let url = "http://localhost:8082/signup";

// ({
//     'email': document.querySelector('[name="email"]'),
//     'password': document.querySelector('[name="password"]'),
//     'nickcname': document.querySelector('[name="nickname"]')
// });


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
        beforeSend: function(jqXHR) {
            console.log(sdata);
        },
        success: function (jqXHR){

            console.log(sdata);
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log(sdata);
            console.log(textStatus);
        }
    })
    
});


