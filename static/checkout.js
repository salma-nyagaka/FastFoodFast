window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
    }
    

    fetch('https://api-version3.herokuapp.com/api/v2/users/orders/New',{
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
        let output = `<table id="tablee">
        <tr>
        <th>MY CART</th>
        <th>PRICE </th>
        <th>DELETE ORDER</th>   
        <th>QUANTITY</th>     
        </tr>`;
        
        let Price = 0;
       
        data["orders"].forEach(res=>{

            Price += res.price * res.quantity
            output += 
            `<tr>
            <td>${res['food_name']}</td>
            <td>${res['price']}</td>
            <td>  <button class="ORDER"  onClick="delete_order('${res['id']}')">  <span class="glyphicon glyphicon-trash"></button></td>
            <td> <input type="number" id="myNumber"><button class="ORDER"  )">ORDER</button>
            </td>
            </tr>`
            }) 
           
            output +=`
            <p><tr><td>Total price</td>
            <td>${Price}</td></tr></p>`

        document.getElementById("container").innerHTML = output;
    })
}

function food_order(quantity){

    fetch(`https://api-version3.herokuapp.com/api/v2/users/orders`,{
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "quantity": quantity
           })
    })
    .then(res=> res.json())
    .then(data=>{          
    })
}



function add(price){
    if (price.length >= 7)
       return description.substring(0, 7) + '...';
    else
       return description;
 };

function myFunction() {
    document.getElementById("myNumber").stepUp(1);
}

function delete_order(id){

    fetch(`https://api-version3.herokuapp.com/api/v2/users/orders/${id}`,{
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
        elem.innerHTML ="The order has been deleted";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);  
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
        