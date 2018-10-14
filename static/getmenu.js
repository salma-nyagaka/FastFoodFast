window.onload = function(){

    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
          
    }


    fetch('http://127.0.0.1:5000/api/v2/menu',{
        method: 'GET',
        mode:'cors',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
    .then(res=>res.json())
    .then(data =>{
        
        let output = '';
        console.log(data)
        data["Food menu"].forEach(res=>{
            output +=` 
                            <div class="column">
                                    <img src="./img/food6.jpeg" alt="Pizza" >
                                    <div class="colum"  class="bg-1">
                                        <h2>${res['name']}</h2>
                                        <p>${res['description']}</p>
                                        <h2>${res['price']}</h2>  
                                        <br>
                                        <button class="ORDER"  onClick="delete_meal('${res['id']}')">DELETE</button>
                                    </div>
                            </div>`
                       
        }) 
        document.getElementById("container").innerHTML = output;
    })}


function delete_meal(id){

    fetch(`http://127.0.0.1:5000/api/v2/menu/${id}`,{
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    .then(res=> res.json())
    .then(data=>{
        alert('Successfully deleted') 
    })
}



function get_meal(id){

    fetch(`http://127.0.0.1:5000/api/v2/menu/${id}`,{
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
      
    })
    .then(res=> res.json())
    .then(data=>{
        redirect: window.location.replace("./getmeal.html")
    })
}



var logout = document.getElementById('signintext')
logout.onclick = function(){
    
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./login.html");
    }

    else{
        localStorage.clear();
        redirect: window.location.replace("./index.html");
    }
}



var newfood = document.getElementById('new')

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
}