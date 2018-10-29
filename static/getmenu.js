//perform some tas when the page loads/ execute a script once a page has loaded
window.onload = function(){

  

    //passing a keyName that returns a key's value or  null if the key does not exist
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }
    // returns an object as  Promise that contains various information 
    //takes one argument which is the path to the resource you want to fetch and returns a response
    
    fetch('https://createorders-api.herokuapp.com/api/v2/menu',{
        
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
     
    // JSON extracts the JSON body content from the response

    .then(res=>res.json())
    .then(data =>{ 


        if(data['message'] === "These are meals") {
           
        let output = '';
        data["Food menu"].forEach(res=>{
            output +=` 
                            <div class="column" id="adminmenu">
                                    <img src="${image[res.image] || image["Default"]}"   alt="food image" >
                                    <div class="colum"  class="bg-1">
                                        <h2 id="menuname">${res['name']}</h2>
                                        <p id="menudescription">${res['description']}</p>
                                        <h2 id="menuprice">${res['price']}</h2>  
                                        <button class="ORDER"  onClick="delete_meal('${res['id']}')">DELETE</button>
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
            element.innerHTML =  `${data["message"]}`;
            element.id = "theoutput"
            document.getElementById('dialog').appendChild(element)
    
        }}
    )
        .catch(function(error){
        console.log(error)            
            })
    }
    
function delete_meal(id){

    fetch(`https://createorders-api.herokuapp.com/api/v2/menu/${id}`,{
        method: 'DELETE',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
    })
    .then(res=> res.json())
    .then(data=>{

        if(data['message'] === "Successfully Deleted") {
            let displayWindow = document.getElementById('dialog')

            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');

            let element = document.createElement('p')
            element.innerHTML =  "Successfully deleted";
            element.id = "theoutput"
            document.getElementById('dialog').appendChild(element)

            setTimeout(() => {
                location.reload();}, 200);        
       
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
