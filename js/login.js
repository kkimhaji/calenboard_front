let url = "http://localhost:8082/signin";

const $form = document.querySelector('#form');

document.querySelector('#gosignup').addEventListener('click', ()=>{
    window.location = '/signup';
})

$form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let sdata = new URLSearchParams();

    var email = document.querySelector('[name="email"]').value;
    var password = document.querySelector('[name="password"]').value;

    sdata.append('email', email);
    sdata.append('password', password);


    $.ajax({
        url: url,
        type: 'POST',
        data: sdata,
        cache:false,
        contentType: false,
        processData: false,
        success: function (response){

            window.location = "/board";
            if(response.data) sessionStorage.setItem("X-AUTH-TOKEN", response.data);
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log("fail");
            console.log(sdata);
            console.log(textStatus);
        }
    })
    
});


