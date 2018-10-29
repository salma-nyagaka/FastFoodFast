window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");


    }
    fetch('https://createorders-api.herokuapp.com/api/v2/orders',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
    .then(res=>res.json())
    .then(data =>{
        if(data['Food Orders']) {
            
                let output = `<table id="tablee">
                                    <tr>
                                    <th>id</th>
                                    <th>username</th>
                                    <th>date</th>
                                    <th>food_name</th>
                                    <th>description</th>
                                    <th>price</th>
                                    <th>current status</th>
                                    <th>view order details</th>

                                    </tr>`;
                                    
                data["Food Orders"].forEach(res=>{
                    truncate(res['description'])
                    let t =  truncate(res['description'])
                    output +=`     <tr>
                                    <td>${res['id']}</td>
                                    <td>${res['username']}</td>
                                    <td>${res['date']}</td>
                                    <td>${res['food_name']}</td>
                                    <td>${t}</td>
                                    <td>${res['price']}</td>
                                    <td>${res['status']}</td>
                                    <td><button class="ORDER"  onClick="specific_order('${res['id']}')">VIEW</button></td>

                                </tr>`
                }) 
                    output +=
                    `</table`
                document.getElementById("container").innerHTML= output;
            
        
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


function specific_order(id){

fetch(`http://127.0.0.1:5000/api/v2/orders/${id}`,{
    method: 'GET',
    headers:{
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
                        <th>date</th>
                        <th>food_name</th>
                        <th>description</th>
                        <th>price</th>
                        <th>current status</th>
                        <th>view order details</th>

                        </tr>`;
                        
    data["Specific order"].forEach(res=>{
        truncate(res['description'])
        let t =  truncate(res['description'])
        output +=`     <tr>
                        <td>${res['id']}</td>
                        <td>${res['username']}</td>
                        <td>${res['date']}</td>
                        <td>${res['food_name']}</td>
                        <td>${t}</td>
                        <td>${res['price']}</td>
                        <td>${res['status']}</td>
                        <td><button class="ORDER">VIEW</a></button></td>

                       </tr>`
    }) 
        output +=
        `</table`
    document.getElementById("containnner").innerHTML= output;
    
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


function truncate(description){
   if (description.length >= 7)
      return description.substring(0, 7) + '...';
   else
      return description;
};
