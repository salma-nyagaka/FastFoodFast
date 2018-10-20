window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "SIGN IN";
    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
    }


    fetch('http://127.0.0.1:5000/api/v2/users/menu',{
        method: 'GET',
        // mode:'cors',
        headers:{
            // 'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
    .then(res=>res.json())
    .then(data =>{    
        let output = '';
        data["Food menu"].forEach(res=>{
            output +=` 
                    <div class="column">
                            <img src="${image[res.image] || image["Default"]}" alt="food image" width="40%" >
                            <div class="colum"  class="bg-1">
                                <h2>${res['name']}</h2>
                                <p>${res['description']}</p>
                                <h2>${res['price']}</h2>  
                                <br>
                                <button class="ORDER"  onClick=order()>ORDER</button>
                            </div>
                    </div>`
                       
        }) 
        document.getElementById("container").innerHTML = output;
    }
)
  }


  function order(){

        let displayWindow = document.getElementById('dialog')
  
        elem = document.getElementById('dialog');
        displayWindow.classList.remove('hidden');

        elem.innerHTML ="The meal has been deleted";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);  
       
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
      