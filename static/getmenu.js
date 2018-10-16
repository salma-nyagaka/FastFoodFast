window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
          
    }

    fetch('https://createorders-api.herokuapp.com/api/v2/menu',{
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

    fetch(`https://createorders-api.herokuapp.com/api/v2/menu/${id}`,{
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    .then(res=> res.json())
    .then(data=>{  
        elem = document.getElementById('dialog');
        elem.innerHTML ="The meal has been deleted";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);  
        location.reload();
       })
}



function get_meal(id){

    fetch(`https://createorders-api.herokuapp.com/api/v2/menu/${id}`,{
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

    
    fetch('https://createorders-api.herokuapp.com/api/v2/menu',{
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
    .then(data => {
        if (data["message"] === "Enter valid food name") {
            document.getElementById('outputt').innerHTML =
            "Food name should only contain alphabets";
            document.getElementById('outputt').style.color = "red";
        }
        if (data["message"] === "Enter valid food description") {
            document.getElementById('outputt').innerHTML =
            "Food description should only contain alphabets";
            document.getElementById('outputt').style.color = "red";
        }
        if (data["message"] === "This food already exists") {
            document.getElementById('outputt').innerHTML =
            "This food already exists";
            document.getElementById('outputt').style.color = "red";
        }
    
        if (data['message'] === 'Food menu created'){
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = "";
           
            document.getElementById('outputt').innerHTML =
            "New meal has been created";
            document.getElementById('outputt').style.color = "blue";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000); 
            
            
            
             }
        else{
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = "";
          }

    })
}

    fetch('https://createorders-api.herokuapp.com/api/v2/menu',{
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
    .then(data => {
        if (data["message"] === "Insufficient permissions to perform this actions") {
            document.getElementById('outputt').innerHTML =
            "You are not allowed to view this page";
            document.getElementById('outputt').style.color = "red";
            redirect: window.location.replace("./userindex.html");

        }
    
      
    })

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
