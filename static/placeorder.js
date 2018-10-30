//function for a user to get the menu and place an order
window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }
    

    //adds the food quantity to the shopping cart
    let costs = 0;
    for (let key in localStorage){
        if (key.slice(0, 6) === "tocart"){
            let item = localStorage[key]
            let name = item.split(" ")[0]
            let price = item.split(" ")[1]
            let foodQuantity = item.split(" ")[2]
          
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
  
    //returns a promise which is a reponse to a request of getting all the menu  
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

        if (window.localStorage.getItem('username') == null){
            elem = document.getElementById('dialog');
                    elem.classList.remove('hidden');
                    let element = document.createElement('p')
                    element.innerHTML =  "please login to view";
                    element.id = "theoutput"
                    elem.appendChild(element)
        }

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
        let phonenumber =  item.getElementsByClassName("phonenumber")[0]

        food_order(name,foodQuantity, phonenumber);
        localStorage.removeItem(`tocart${name}`);

    }
}
 
//function to place an order
function food_order(name, quantity){
    let phonenumber = document.getElementById('phonenumber').value;


    fetch(`https://createorders-api.herokuapp.com/api/v2/users/orders`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name,
            "quantity": quantity,
            "phonenumber": phonenumber
        })
    })
    .then(res=> res.json())
    .then(data=>{
        if(data['food_order'] === "order placed sucessfully") {


        window.localStorage.setItem('phonenumber', data['phonenumber'])
        
        elem = document.getElementById('dialog');
        elem.classList.remove('hidden');
        elem.innerHTML ="Order has beed added";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);   
        setTimeout(() => {
            location.reload();}, 1000);         
    }
else{
        elem = document.getElementById('dialog');
        elem.classList.remove('hidden');
        let element = document.createElement('p')
        element.innerHTML = `${data["message"]}`;
        element.id = "newoutput"
        elem.appendChild(element)

        setTimeout(() => {
            location.reload();}, 1900); 

}})
}


//function to append orders to the shopping cart
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
                    window.localStorage.setItem(`tocart${name}`, `${name} ${price} ${foodQuantity} ${phonenumber}`)
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
                        location.reload();}, 900);  }  
                    })  

        }
        window.localStorage.setItem(`tocart${name}`, `${name} ${price} ${foodQuantity} ${phonenumber}`)

    }

    else {
        document.getElementById("foodquantity").classList.remove("hidden")
        let addCart = document.getElementById("newOrder")
        addCart.addEventListener("click", () =>{
            let foodQuantity = +document.getElementById("quantity").value;
            if (foodQuantity > 0) {
                let price = clickedItem.parentNode.querySelector("#price").innerHTML;
                window.localStorage.setItem(`tocart${name}`, `${name} ${price} ${foodQuantity} ${phonenumber}`)
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
                    location.reload();}, 900);  
                }              
        
        })  

    }
}

let qInputDiv = document.getElementById("foodquantity")
function closeDialog() { 
    qInputDiv.classList.add("hidden")
} 

//function to delete an order from the shopping cart
function deleteOrder(target){ 
    let parentOrder = target.parentNode.parentNode
    let name = parentOrder.querySelector(".name").innerHTML
    localStorage.removeItem(`tocart${name}`)
    setTimeout(() => {

    location.reload();}, 90);}

//function to logout
var logout = document.getElementById('signintext')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./login.html");
    }

    else{
        localStorage.clear();
    }
}
