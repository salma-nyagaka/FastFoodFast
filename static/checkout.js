window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
    }

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
        let output = `<h4><i class="fa fa-shopping-cart"></i>Cart <span class="price" style="color:black">
                            <b>Price</b>
                            </span>
                      </h4>
                      `;
        
        console.log(data)

        let Price = 0;


        data["orders"].forEach(res=>{

            Price += res.price
            console.log(Price)

            output +=` 
            <p>${res['food_name']} <span class="price">${res['price']}</span></p>`
            }) 

            output +=`<h4>Total price<span class="price" style="color:black">
            <b>${Price}</b>
            </span>
      </h4>`

        document.getElementById("container").innerHTML = output;
    })
}




function add(price){
    if (price.length >= 7)
       return description.substring(0, 7) + '...';
    else
       return description;
 };
 

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






        