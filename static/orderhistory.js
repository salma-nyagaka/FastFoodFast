//function to get all the users order history
window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }
      
    //returns a promise which is a reponse to a request   
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
                            <th>ID</th>
                            <th>DATE</th>
                            <th>FOOD_NAME</th>
                            <th>DESCRIPTION</th>
                            <th>PRICE</th>
                            <th>QUANTITY</th>
                            <th>STATUS</th>
                            <th>PHONE NUMBER</th>

                            </tr>`;
        data["Orders"].forEach(res=>{
            output +=    ` <tr>
                            <td>${res['id']}</td>
                            <td>${res['date']}</td>
                            <td>${res['food_name']}</td>
                            <td>${res['description']}</td>
                            <td>${res['price']}</td>
                            <td>${res['quantity']}</td>
                            <td>${res['status']}</td>
                            <td>${res['phonenumber']}</td>

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
