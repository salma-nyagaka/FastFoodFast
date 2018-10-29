window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }
    
    let costs = 0;

    for (let key in localStorage){
        if (key.slice(0, 6) === "tocart"){
            console.log(this.localStorage[key])
            let item = localStorage[key]
            let name = item.split(" ")[0]
            let price = item.split(" ")[1]
            let foodQuantity = item.split(" ")[2]
            let totalPrice = item.split(" ")[3]
          
            totalPrice = +price * +foodQuantity 
            costs += +totalPrice
           
            let order = `<tr class="ordered-item" id="myCart">
                <td class="name" id="cartname">${name}</td>
                <td id="cartprice">${price}</td>         
                <td class="quantity" id="foodQuantity"> ${foodQuantity}</td>
                <td>${totalPrice}</td>
                <td><button class="order" onclick="deleteOrder(this)" id="delete">Delete</span></button></td>
            </tr>`      
 
            document.getElementById("tablee").innerHTML += order;
            document.getElementById("total").innerHTML = `TOTAL COSTS: ${costs}`;

            
        }
    }
  

    fetch('https://createorders-api.herokuapp.com/api/v2/users/menu',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
    .then(res=>res.json())
    .then(data =>{
        if (data['message'] === 'These are the available food items'){

        
        let output = '';
        data["Food menu"].forEach(res=>{
            
            
            output +=` 
                            <div class="column" id="usermenu">
                            <img src="${image[res.image] || image["Default"]}"   alt="food image" >
                                 <div class="colum"  class="bg-1">
                                        <h2>${res['name']}</h2>
                                        <h2>${res['description']}</h2>
                                        <h2 id="price">${res['price']}</h2>
                                        <br>
                                        <button class="ORDER" onClick="my_cart(this)" id="makeOrder">ORDER</button>

                                    </div>
                            </div>`
            }) 
        document.getElementById("container").innerHTML = output;
    }
    else{
        let displayWindow = document.getElementById('dialog')
        elem = document.getElementById('dialog');
        displayWindow.classList.remove('hidden');
        let element = document.createElement('p')
        element.innerHTML =  `${data["message"]}`;
        element.id = "theoutput"
        document.getElementById('dialog').appendChild(element)

    }}
)
    .catch(function(error){
    console.log(error)            
        })
}


function makeOrder(){

    let itemsToOrder = document.getElementsByClassName("ordered-item")
    for (let item of itemsToOrder){
        let name = item.getElementsByClassName("name")[0].innerHTML
        let foodQuantity = item.getElementsByClassName("quantity")[0].innerHTML

        food_order(name,foodQuantity);
        localStorage.removeItem(`tocart${name}`);

    }
}
 
function food_order(name, quantity){

    fetch(`https://createorders-api.herokuapp.com/api/v2/users/orders`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name,
            "quantity": quantity
        })
    })
    .then(res=> res.json())
    .then(data=>{
        
        let displayWindow = document.getElementById('dialog')
        displayWindow.classList.remove('hidden');
        elem = document.getElementById('dialog');
        elem.innerHTML ="Order has beed added";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);   
        setTimeout(() => {
            location.reload();}, 1000);         
    })
}

let number = 0;

function my_cart(clickedItem){
    let name = clickedItem.parentNode.querySelector("h2").innerHTML;
    let clickedItemId = `tocart${name}`

    if(clickedItemId in localStorage){
        let currentQ = localStorage[clickedItemId].split(" ")[2]

        
        let qInputDiv = document.getElementById("foodquantity");
           
        qInputDiv.classList.remove("hidden")
        let qInput = document.getElementById("quantity");
        qInput.value = currentQ;
        
        if(qInputDiv){

            let addCart = document.getElementById("newOrder")
            addCart.addEventListener("click", () =>{
                let foodQuantity = +qInput.value;
                if (foodQuantity > 0) {
                    let price = clickedItem.parentNode.querySelector("#price").innerHTML;
                    window.localStorage.setItem(`tocart${name}`, `${name} ${price} ${foodQuantity}`)
                    location.reload()    
                }
                else{
                    let qInputDiv = document.getElementById("foodquantity")
                    qInputDiv.classList.add("hidden")                    
                    let displayWindow = document.getElementById('dialog')
                    elem = document.getElementById('dialog');
                    displayWindow.classList.remove('hidden');
                    elem.innerHTML ="Quantity cannot be zero";
                    setTimeout(() => {
                        location.reload();}, 1000);  }  
                    })  

        }
        window.localStorage.setItem(`tocart${name}`, `${name} ${price} ${foodQuantity}`)

    }

    else {
        document.getElementById("foodquantity").classList.remove("hidden")
        let addCart = document.getElementById("newOrder")
        addCart.addEventListener("click", () =>{
            let foodQuantity = +document.getElementById("quantity").value;
            if (foodQuantity > 0) {
                let price = clickedItem.parentNode.querySelector("#price").innerHTML;
                window.localStorage.setItem(`tocart${name}`, `${name} ${price} ${foodQuantity}`)
                location.reload()    
    
            }
            else{
                let qInputDiv = document.getElementById("foodquantity")
                qInputDiv.classList.add("hidden")
                let displayWindow = document.getElementById('dialog')
                elem = document.getElementById('dialog');
                displayWindow.classList.remove('hidden');
                elem.innerHTML ="Quantity cannot be zero";
                setTimeout(() => {
                    location.reload();}, 1000);  }              
        
        })  

    }
}

let qInputDiv = document.getElementById("foodquantity")
function closeDialog() { 
    qInputDiv.classList.add("hidden")
} 

function deleteOrder(target){
  
    let parentOrder = target.parentNode.parentNode
    let name = parentOrder.querySelector(".name").innerHTML
    localStorage.removeItem(`tocart${name}`)
    location.reload();

    console.log(name)
}


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
            location.reload();}, 1900);  
})}


var logout = document.getElementById('signintext')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./login.html");
    }

    else{
        localStorage.clear();
    }
}
