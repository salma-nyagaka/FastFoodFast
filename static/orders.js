window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
    }

    fetch(' http://127.0.0.1:5000/api/v2/orders',{
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
                            <th>food_name</th>
                            <th>description</th>
                            <th>price</th>
                            <th>current status</th>
                            </tr>`;
                            
        data["Food Orders"].forEach(res=>{
            truncate(res['description'])
            let t =  truncate(res['description'])
            output +=`     <tr>
                            <td>${res['id']}</td>
                            <td>${res['username']}</td>
                            <td>${res['food_name']}</td>
                            <td>${t}</td>
                            <td>${res['price']}</td>
                            <td>${res['status']}</td>
                           </tr>`
        }) 
            output +=
            `</table`
        document.getElementById("container").innerHTML= output;
        
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
