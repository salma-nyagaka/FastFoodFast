//function to get all the orders
window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }

     //returns all the orders which is a response to a request
    fetch('https://createorders-api.herokuapp.com/api/v2/orders',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    }) 
    
    // JSON extracts the JSON body content from the response 
    .then(res=>res.json())
    .then(data =>{ 

            
        if(data['Food Orders']) {       

        let output = `<table id="tablee">
                            <tr>
                            <th>ID</th>
                            <th>USERNAME</th>
                            <th>FOOD_NAME</th>
                            <th>DESCRI[TION</th>
                            <th>PRICE</th>
                            <th>PHONE NUMBER</th>
                            <th>CURRENT STATUS</th>
                            <th>UPDATE STATUS</th>
                            </tr>`;        
        data["Food Orders"].forEach(res=>{
            output +=` 
                            <tr>
                            <td>${res['id']}</td>
                            <td>${res['username']}</td>
                            <td>${res['food_name']}</td>
                            <td>${res['description']}</td>
                            <td>${res['price']}</td>
                            <td>${res['phonenumber']}</td>
                            <td>${res['status']}</td>
                            <td><button class="ORDER"  onClick="status('${res['id']}')">Accept</button>
                            <button class="ORDER"  onClick="decline('${res['id']}')">Decline</button>
                            </td>
                            </tr>`
        }) 

        output +=
        `</table>`
        document.getElementById("container").innerHTML = output;
    }
        else{
            elem = document.getElementById('dialog');
            elem.classList.remove('hidden');
            element = document.createElement('p')
            element.innerHTML =  `${data["message"]}`;
            element.id = "theoutput"
            elem.appendChild(element)

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


//function to update order status to processing        
function status(id){
    
    fetch(`https://createorders-api.herokuapp.com/api/v2/update/order/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "status": "Processing"
           })
    })
    .then(res=> res.json())
    .then(data=>{
        elem = document.getElementById('dialog');
        elem.classList.remove('hidden');
        elem.innerHTML ="Order is getting processed";
       
        setTimeout(() => {
        location.reload();}, 1000);         
    })
                
}

//function to update order status to declined         
function decline(id){  
    fetch(`https://createorders-api.herokuapp.com/api/v2/update/order/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "status": "Declined"
           })
    })
    .then(res=> res.json())
    .then(data=>{
          if (data["message"] === "Insufficient permissions to perform this actions") {
            document.getElementById('outputt').innerHTML =
            "You are not allowed to view this page";
            document.getElementById('outputt').style.color = "red";
            redirect: window.location.replace("./userindex.html");

        }
    
        elem = document.getElementById('dialog');
        elem.classList.remove('hidden');
        elem.innerHTML ="Order has been declined";
        
        setTimeout(() => {
        location.reload();}, 1000);  

     })
}

//function to logout
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
       