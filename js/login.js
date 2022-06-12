let url = "http://localhost:8082/signin";
var xhr = new XMLHttpRequest();
const $form = document.querySelector('#form');

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
            console.log(response);
            window.location = "/";
            if(response.data) localStorage.setItem("token", response.data);
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log("fail");
            console.log(sdata);
            console.log(textStatus);
        }
    })
    
});


