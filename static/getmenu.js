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
    fetch(`${url}/menu`,{       
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

                }
    })
     
    // JSON extracts the JSON body conteznt from the response
    .then(res=>res.json())
    .then(data =>{              
        
        if(data['message'] === "These are meals") {
            elem = document.getElementById('dialog');
            elem.classList.remove('hidden');
            let element = document.createElement('h2')
            element.innerHTML =  "These are the available meals";
            element.id = "theoutput"
            elem.appendChild(element)
            

        let output = '';
        data["Food menu"].forEach(res=>{
            output +=` 
                            <div class="column" id="adminmenu">
                                    <img src="${image[res.image] || image["Default"]}"   alt="food image" >
                                    <div class="colum"  class="bg-1">
                                        <h2 id="menuname">${res['name']}</h2>
                                        <p id="menudescription">${res['description']}</p>
                                        <h2 id="menuprice">${res['price']}</h2>  
                                        <button class="ORDER"  onClick="getMeal('${res['id']}')">EDIT</button>
                                        <br><br>
                                        <button class="ORDER"  onClick="deleteMeal('${res['id']}')">DELETE</button>
                                    </div>
                            </div>`
                       
        }) 
        document.getElementById("container").innerHTML = output;
       
              }
        else{
            elem = document.getElementById('dialog');
            elem.classList.remove('hidden');
            let element = document.createElement('p')
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

function getMeal(id){
      
    let qInputDiv = document.getElementById("food");
           
    qInputDiv.classList.remove("hidden")
    let qInput = document.getElementById("quantity");
    updateMeal(id)

}

function closeDialog() {
    let qInputDiv = document.getElementById("food")
 
    qInputDiv.classList.add("hidden")
} 

function updateMeal(id){

    var newfood = document.getElementById('update')
    newfood.addEventListener("click", () =>{
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('images').value;

    fetch(`http://127.0.0.1:5000/api/v2/menu/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },

        //declaring content type
        body: JSON.stringify({
            "name": name,
            "description": description,
            "price": price,
            "image": image})
    })
    .then(res => res.json())
    .then(data => {

        elem = document.getElementById('dialog');
        elem.classList.remove('hidden');
        let element = document.createElement('p')

        if (data['message'] === 'Food menu updated'){
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = ""; 
            document.getElementById('images').value = "";  
                    
            element.innerHTML =  "Food menu created";
            element.id = "theoutput"
            elem.appendChild(element)

            setTimeout(() => {
                location.reload();}, 1900);                                   
             
        }
        else{
            element.innerHTML =  `${data["message"]}`;
            element.id = "newoutput"
            elem.appendChild(element)
  
            setTimeout(() => {
                location.reload();}, 1900);  

            
          }

    })

})
}

    
//function to delete a meal item
function deleteMeal(id){
    fetch(`${url}/${id}`,{
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
