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
            let window = document.getElementById('container')
            window.classList.remove('hidden')
            

        let output = '';
        data["Food menu"].forEach(res=>{

            output +=` 
                            <div class="column" id="adminmenu">
                                    <img src="${image[res.image] || image["Default"]}"   alt="food image" id="image">
                                    <div class="colum"  class="bg-1">
                                        <p class="food-name" id="menuname">${res['name']}</p>
                                        <p id="menudescription">${res['description']}</p>
                                        <p id="menuprice">${res['price']}</p>  
                                        <button class="ORDER"  onClick="getMeal('${res['id']}')">EDIT</button>
                                        <br><br>
                                        <button class="ORDER"  onClick="deleteMeal('${res['id']}')">DELETE</button>
                                    </div>
                            </div>`
                        
                            
                       
        }) 
        document.getElementById("container").innerHTML = output;
        pagination()
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
    let menuwindow = document.getElementById('container')
    menuwindow.classList.add('hidden')
    updateMeal(id)

}

function closeDialog() {
    let qInputDiv = document.getElementById("food")
   
    qInputDiv.classList.add("hidden")
    let menuwindow = document.getElementById('container')
    menuwindow.classList.remove('hidden')
            
} 

function updateMeal(id){

    var newfood = document.getElementById('update')
    newfood.addEventListener("click", () =>{
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('images').value;

    fetch(`${url}/menu/${id}`,{
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

        elem = document.getElementById('updatedialog');
        elem.classList.remove('hidden');
        let element = document.createElement('p')
        

        if (data['message'] === 'Food menu updated'){
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = ""; 
            document.getElementById('images').value = "";  
                    
            element.innerHTML =  "Food menu updated";
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

function searchBar() {

    let input = document.getElementById("search").value
    let name = input.toUpperCase();
    let foodNames = document.getElementsByClassName("food-name")
    for(let foodNameP of foodNames) {
        let foodName = foodNameP.innerHTML.toUpperCase()
        if(!foodName.includes(name) ){
            foodNameP.parentNode.parentNode.style.display = "none"
        } else {
            pagination()
        }
    }
}


let n = 0;
function pagination(){
    let allMeals = document.getElementsByClassName("column")
    allMeals = Array.from(allMeals)


    let displayMeals = allMeals.slice(n, 4) 
    pageDisplay(displayMeals)  
}

function pageDisplay(array){
    let allMeals = document.getElementsByClassName("column")
    allMeals = Array.from(allMeals)

    allMeals.forEach((meal) =>{
        if(array.indexOf(meal) < 0){
            meal.style.display = "none"
            
        }
        else{
            meal.style.display = "inline"
        }
    })
}

function nextPage(){
    let allMeals = document.getElementsByClassName("column")
    allMeals = Array.from(allMeals)
    
    if(n+4 < allMeals.length){
        n += 4;
    }
    else{
        pagination()    
    }
    let newPage = allMeals.slice(n, n+4)
    pageDisplay(newPage)
   
}

function previousPage(){
    let allMeals = document.getElementsByClassName("column")
    if(n-4 > 0){
        n -= 4;
    }
    else{
        n = 0;    
    }
    allMeals = Array.from(allMeals)
    let newPage = allMeals.slice(n, n+4)
    pageDisplay(newPage)
   
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