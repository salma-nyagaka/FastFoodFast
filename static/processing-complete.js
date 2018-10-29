window.onload = function(){

    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }
    
    fetch('https://createorders-api.herokuapp.com/api/v2/orders/Processing',{
        metdod: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
    
                }
    })
    .then(res=>res.json())
    .then(data =>{
        let loadingWindow = document.getElementById('loader')
        element = document.getElementById('loader');
        loadingWindow.classList.add('hidden')

        if(data['Updated orders']) {          
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

        data["Updated orders"].forEach(res=>{
            output +=` 
                            <tr>
                            <td>${res['id']}</td>
                            <td>${res['username']}</td>
                            <td>${res['food_name']}</td>
                            <td>${res['description']}</td>
                            <td>${res['price']}</td>
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
            let displayWindow = document.getElementById('dialog')
            displayWindow.classList.remove('hidden');
            elem = document.getElementById('dialog');
            elem.innerHTML ="Order has been completed";

            setTimeout(() => {
            location.reload();}, 1900);  
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
