// window.onload = function(){
//     if (window.localStorage.getItem('username') == null){
//         document.getElementById('signintext').innerHTML = "SIGN IN";
//     }
//     else{
//         document.getElementById('signintext').innerHTML = "LOG OUT";
//     }
    

//     fetch('http://127.0.0.1:5000/api/v2/users/orders/New',{
//         method: 'GET',
//         mode:'cors',
//         headers:{
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json',
//             'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

//                 }
//     })
//     .then(res=>res.json())
//     .then(data =>{
//         let output = `<table id="tablee">
//         <tr>
//         <th>MY CART</th>
//         <th>PRICE </th>
//         <th>DELETE ORDER </th>
//         <th>QUANTITY</th>        
//         </tr>`;
        
//         let Price = 0;
       
//         data["orders"].forEach(res=>{

//             Price += res.price 
//             output += 
//             `<tr>
//             <td>${res['food_name']}</td>
//             <td>${res['price']}</td>
//             <td><button class="ORDER" onClick="delete_order('${res['id']}')" >  <span class="glyphicon glyphicon-trash"></span></button></td>
//             <td><input type="text" id="inc" value="0"></input>${res['quantity']}
//             </td>        
//             </tr>`
//             }) 
           
//             output +=`
//             <p><tr><td>Total price</td>
//             <td>${Price}</td></tr></p>`

//         document.getElementById("container").innerHTML = output;
//     })
// }



// function food_order(quantity){

//     fetch(`https://createorders-api.herokuapp.com/api/v2/users/orders`,{
//         method: 'POST',
//         headers: {
//             'Access-Control-Allow-Origin': '*',

//             'Content-Type': 'application/json',
//             'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
//         },
//         body: JSON.stringify({
//             "quantity": quantity
//            })
//     })
//     .then(res=> res.json())
//     .then(data=>{          
//     })
// }



// function add(price){
//     if (price.length >= 7)
//        return description.substring(0, 7) + '...';
//     else
//        return description;
//  };

// function myFunction() {
//     document.getElementById("myNumber").stepUp(1);
// }

// function delete_order(id){

//     fetch(`http://127.0.0.1:5000/api/v2/users/orders/${id}`,{
//         method: 'DELETE',
//         headers: {
//             'Access-Control-Allow-Origin': '*',

//             'Content-Type': 'application/json',
//             'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
//         },
//     })
//     .then(res=> res.json())
//     .then(data=>{
//         let displayWindow = document.getElementById('dialog')
  
//         elem = document.getElementById('dialog');
//         displayWindow.classList.remove('hidden');

//         elem.innerHTML ="Your order has been deleted";
//         setTimeout(() => {
//             elem.parentNode.removeChild(elem);
//         }, 2000);  
//         setTimeout(() => {
//             location.reload();}, 4000);  
//             })
// }

// var logout = document.getElementById('signintext')
// logout.onclick = function(){
//     if (window.localStorage.getItem('username') == null){
//         redirect: window.location.replace("./login.html");
//     }

//     else{
//         localStorage.clear();
//         redirect: window.location.replace("./index.html");
        
//     }
// }
        

window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";

    }
    var $button = document.querySelector('.increment-btn');
    var $counter = document.querySelector('.counter');
    

    fetch(' http://127.0.0.1:5000/api/v2/users/menu',{
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
                                        <h2 id="price">${res['price']}</h2>
                                        <br>
                                        <button class="ORDER" onClick="food_order('${res['name']}')"  class="increment-btn">ORDER</button>
                                    </div>
                            </div>`
            }) 
        document.getElementById("container").innerHTML = output;

    })


    fetch('http://127.0.0.1:5000/api/v2/users/orders/New',{
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
        <th>DELETE ORDER </th>
        <th>QUANTITY</th>        
        </tr>`;
        
        let Price = 0;

        data["orders"].forEach(res=>{

            Price += res.price 
            output += 
            `<tr>
            <td>${res['food_name']}</td>
            <td>${res['price']}</td>
            <td><button class="ORDER" onClick="delete_order('${res['id']}')" >  <span class="glyphicon glyphicon-trash"></span></button></td>
            <td><input type="text" id="inc" value="0"></input>${res['quantity']}</td>        
            </tr>`
            }) 
           
            output +=`
            <p><tr><td>Total price</td>
            <td>${Price}</td></tr></p>`

        document.getElementById("containner").innerHTML = output;
    })
}

;

function delete_order(id){

    fetch(`http://127.0.0.1:5000/api/v2/users/orders/${id}`,{
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    .then(res=> res.json())
    .then(data=>{
        let displayWindow = document.getElementById('dialog')
  
        elem = document.getElementById('dialog');
        displayWindow.classList.remove('hidden');

        elem.innerHTML ="Your order has been deleted";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);  
        setTimeout(() => {
            location.reload();}, 4000);  
            })
}
 



function food_order(name){
    
    fetch(` http://127.0.0.1:5000/api/v2/users/orders`,{
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name
           })
    })
    .then(res=> res.json())
    .then(data=>{
        var i = 0;

        document.getElementById('inc').value = ++i;
    

        
        // let displayWindow = document.getElementById('dialog')
        // displayWindow.classList.remove('hidden');
        // elem = document.getElementById('dialog');
        // elem.innerHTML ="Order has beed added";
        // setTimeout(() => {
        //     elem.parentNode.removeChild(elem);
        // }, 2000);   
        // setTimeout(() => {
        //     location.reload();}, 1000);         
    })
}




var logout = document.getElementById('signintext')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./login.html");
    }

    else{
        localStorage.clear();
    }
}
   