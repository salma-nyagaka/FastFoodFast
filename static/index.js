window.onload = function(){
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");
        document.getElementById('back').innerHTML = "DASHBOARD";

    }
    
    fetch('https://createorders-api.herokuapp.com/api/v2/users/menu',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
    .then(res=>res.json())
    .then(data =>{ 
        if (data['message'] === 'These are the available food items'){
   
        let output = '';
        data["Food menu"].forEach(res=>{
            output +=` 
                    <div class="column">
                            <img src="${image[res.image] || image["Default"]}" alt="food image" width="52%" height="100%" >
                            <div class="colum"  class="bg-1">
                                <h2>${res['name']}</h2>
                                <h2>${res['description']}</h2>
                                <h2>${res['price']}</h2>  
                                <br>
                                <button class="order"  onClick=order()>ORDER</button>
                            </div>
                    </div>`
                       
        }) 
        document.getElementById("container").innerHTML = output;
    }
        else{
            let displayWindow = document.getElementById('dialog')
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');
            let element = document.createElement('p')
            element.innerHTML =  `No meal item`;
            element.id = "theoutput"
            document.getElementById('dialog').appendChild(element)

}})
    .catch(function(error){
       console.log(error)            
        })
}


  function order(){

        let displayWindow = document.getElementById('dialog')
  
        elem = document.getElementById('dialog');
        displayWindow.classList.remove('hidden');

        elem.innerHTML ="LOGIN TO ORDER";
        setTimeout(() => {
            elem.parentNode.removeChild(elem);
        }, 2000);
        setTimeout(() => {
            location.reload();}, 1900);   
       
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

var back = document.getElementById('back')
back.onclick = function(){
   
        redirect: window.location.replace("./userindex.html");
    
}
      