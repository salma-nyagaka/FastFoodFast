window.onload = function(){
    let loadingWindow = document.getElementById('loader')
    element = document.getElementById('loader');
    loadingWindow.classList.remove('hidden');

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
     let loadingWindow = document.getElementById('loader')
    element = document.getElementById('loader');
    loadingWindow.classList.add('hidden');

        if(data['Food Orders']) {
            
                let output = `<table id="tablee">
                                    <tr>
                                    <th>ID</th>
                                    <th>USERNAME</th>
                                    <th>DATE</th>
                                    <th>FOOD_NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>PRICE</th>
                                    <th>STATUS</th>

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
