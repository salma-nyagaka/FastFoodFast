window.onload = function(){

    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
    }

    fetch('http://127.0.0.1:5000/api/v2/orders',{
        metdod: 'GET',
        mode:'cors',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
    .then(res=>res.json())
    .then(data =>{
        let output = `<table id="tablee">
                            <tr>
                            <th>id</th>
                            <th>username</th>
                            <th>food_name</th>
                            <th>description</th>
                            <th>price</th>
                            <th>current status</th>
                            <th>update status</th>
                            </tr>`;
        console.log(data)
        data["Food Orders"].forEach(res=>{
            output +=` 
                            <tr>
                            <td>${res['id']}</td>
                            <td>${res['username']}</td>
                            <td>${res['food_name']}</td>
                            <td>${res['description']}</td>
                            <td>${res['price']}</td>
                            <td>${res['status']}</td>
                            <td><button class="ORDER"  onClick="status('${res['id']}')">Accept</button>
                            <button class="ORDER"  onClick="decline('${res['id']}')">Decline</button>
                            </td>
                            </tr>`
        }) 

        output +=
        `</table>`

        document.getElementById("container").innerHTML = output;
    })}


        
function status(id){
    
    fetch(`http://127.0.0.1:5000/api/v2/update/order/${id}`,{
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "status": "Processing"
           })
    })
    .then(res=> res.json())
    .then(data=>{
        alert('Order accepted') 
    })
}

   
function decline(id){
    
    fetch(`http://127.0.0.1:5000/api/v2/update/order/${id}`,{
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "status": "decline"
           })
    })
    .then(res=> res.json())
    .then(data=>{
        alert('Order declined') 
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



        