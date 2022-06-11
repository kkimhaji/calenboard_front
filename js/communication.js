
let url = "https://localhost:8082";

fetch(url)
    .then((response) => response.json())
    .then((response)=>{
        this.setState({users:response})
    });

const params = {
    email: "",
    nickname:"",
    password:""
};

fetch(url, {
    method:"POST",
    headers:{
        'Content-Type':"application/json",
    },
    body: JSON.stringify(params)
})
.then((response) =>response.json())
.then((params) => {
    console.log('성공: ', params);
})
.catch((error)=>{
    console.error("fail: ", error);
})
