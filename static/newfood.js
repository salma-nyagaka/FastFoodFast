var newfood = document.getElementById('new')

window.onload = function(){

    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
    }

newfood.onclick= function(){
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;

    
    fetch('http://127.0.0.1:5000/api/v2/menu',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name,
            "description": description,
            "price": price})
    })
    .then(res => res.json())
    .then(data => {console.log(data)
        if (data['message'] === 'Food menu created'){
            document.getElementById('name').value = "name";
            document.getElementById('description').value = "description";
            document.getElementById('price').value = "price";
            document.getElementById('image').value = "";}
        else{
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = "";
            document.getElementById('image').value = "";}

    })
}


var image = document.getElementById('btnSubmit')


image.onclick= function(){

document.addEventListener('DOMContentLoaded', init);

function init(){
    document.getElementById('btnSubmit').addEventListener('click', upload);
}

function upload(ev){
    ev.preventDefault();

    let h = new Headers();
    h.append('Accept', 'application/json');

    let fd = new FormData();
    fd.append('new', document.getElementById('btnSubmit').value);
    let myFile = document.getElementById('btnSubmit').files[0];
    fd.append('avatar', myFile, "avatar.png", "avarar.jpeg", "avatar.jpg");

  

    fetch('http://127.0.0.1:5000/api/v2/menu',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name,
            "description": description,
            "price": price})
    })
    .then(res => res.json())
    .then(data => {console.log(data)
      
    })
}}



var logout = document.getElementById('signintext')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./login.html");
    }

    else{
        localStorage.clear();
        redirect: window.location.replace("./index.html");
    }
}}