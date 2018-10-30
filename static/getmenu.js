//function to login
window.onload = function(){


    //passing a keyName that returns a key's value or returns null if the key does not exist
    if (window.localStorage.getItem('username') == null){
        document.getElementById('signintext').innerHTML = "LOG IN";
        document.getElementById('signintext').setAttribute("href", "./login.html");

    }
    else{
        document.getElementById('signintext').innerHTML = "LOG OUT";
        document.getElementById('signintext').setAttribute("href", "./index.html");

    }

    //returns a promise which is a reponse to a request of getting all the menu   
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
    
//function to delete a meal item
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
                    elem = document.getElementById('dialog');
                    elem.classList.remove('hidden');
                    let element = document.createElement('p')
                    element.innerHTML =  "Successfully deleted";
                    element.id = "theoutput"
                    elem.appendChild(element)

                    setTimeout(() => {
                        location.reload();}, 900);        
            
            }
                else{
                    elem = document.getElementById('dialog');
                    elem.classList.remove('hidden');
                    let element = document.createElement('p')
                    element.innerHTML =  `${data["message"]}`;
                    element.id = "theoutput"
                    elem.appendChild(element)

                }
            }
)
    .catch(function(error){
    console.log(error)            
        })
}

//function to logout
var logout = document.getElementById('signintext')
logout.onclick = function(){
    
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./adminindex.html");
    }

    else{
        localStorage.clear();
        redirect: window.location.replace("./index.html");
    }
}
