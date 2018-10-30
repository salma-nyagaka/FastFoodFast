//function to get all the accepted orders
window.onload = function(){

    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }
    
    //returns a promise which is a reponse to a request of getting all the accepted orders  
    fetch('https://createorders-api.herokuapp.com/api/v2/orders/Processing',{
        metdod: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
    
                }
    })

    // JSON extracts the JSON body content from the response
    .then(res=>res.json())
    .then(data =>{

        if(data['Updated orders']) {          
        let output = `<table id="tablee">
                        <tr>
                        <th>ID</th>
                        <th>USERNAME</th>
                        <th>FOOD_NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>PHONE NUMBER</th>
                        <th>CURRENT STATUS</th>
                        <th>UPDATE STATUS</th>
                        </tr>`;

        data["Updated orders"].forEach(res=>{
            output +=` 
                            <tr>
                            <td>${res['id']}</td>
                            <td>${res['username']}</td>
                            <td>${res['food_name']}</td>
                            <td>${res['description']}</td>
                            <td>${res['price']}</td>
                            <td>${res['phonenumber']}</td>
                            <td>${res['status']}</td>
                            <td><button class="ORDER"  onClick="status('${res['id']}')">Complete</button>    
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

//function to update status to complete
function status(id){       
    fetch(`https://createorders-api.herokuapp.com/api/v2/update/order/${id}`,{
        method: 'PUT',
        headers: {  
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "status": "Complete"
            })
    })
    .then(res=> res.json())
    .then(data=>{
        elem = document.getElementById('dialog');
        elem.classList.remove('hidden');
        elem.innerHTML ="Order has been completed";

        setTimeout(() => {
        location.reload();}, 1900);  
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
