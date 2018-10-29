window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }
        
    fetch('https://createorders-api.herokuapp.com/api/v2/users/orders',{
        metdod: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
    
                }
    })
    .then(res=>res.json())
    .then(data =>{

        if(data['Orders']) {
       
        let output = `<table id="tableee">
                            <tr>
                            <th>id</th>
                            <th>date</th>
                            <th>food_name</th>
                            <th>description</th>
                            <th>price</th>
                            </tr>`;
        data["Orders"].forEach(res=>{
            output +=    ` <tr>
                            <td>${res['id']}</td>
                            <td>${res['date']}</td>
                            <td>${res['food_name']}</td>
                            <td>${res['description']}</td>
                            <td>${res['price']}</td>
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
