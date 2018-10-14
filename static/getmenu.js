window.onload = function(){

    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
          
    }

elem = document.getElementById('dialog');
elem.innerHTML =" Successfully logged in as an admin";
setTimeout(() => {
    elem.parentNode.removeChild(elem);
}, 2000);

    

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
                                <img src="./img/baberque.jpeg" alt="Pizza" >
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