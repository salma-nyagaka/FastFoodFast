window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
    }

    fetch('https://createorders-api.herokuapp.com/api/v2/users/menu',{
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
        
        let output = '';
        console.log(data)
        data["Food menu"].forEach(res=>{
            output +=` 
                            <div class="column">
                                <img src="./img/food6.jpeg" alt="Pizza" >
                                    <div class="colum"  class="bg-1">
                                        <h2>${res['name']}</h2>
                                        <p>${res['description']}</p>
                                        <h2>${res['price']}</h2>
                                        <br>
                                        <button class="ORDER"  onClick="food_order('${res['name']}')">ORDER</button>


                                    </div>
                            </div>`
            }) 
        document.getElementById("container").innerHTML = output;
    })
}
    
function food_order(name){

    fetch(`https://createorders-api.herokuapp.com/api/v2/users/orders`,{
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name
           })
    })
    .then(res=> res.json())
    .then(data=>{
        elem = document.getElementById('dialog');
        elem.innerHTML ="Order has beed added";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 20000);   
        redirect: window.location.replace("./userindex.html");

       
    })
}

var logout = document.getElementById('signintext')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./login.html");
    }

    else{
        localStorage.clear();
        if (window.confirm("Do you really want to leave?")) { 
            window.open("index.html");
          }        
    }
}
   