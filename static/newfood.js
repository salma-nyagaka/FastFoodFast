//function to place a new meal
if (window.localStorage.getItem('username') == null){
    document.getElementById('signintext').innerHTML = "LOG IN";
    document.getElementById('signintext').setAttribute("href", "./login.html");

}
else{
    document.getElementById('signintext').innerHTML = "LOG OUT";
    document.getElementById('signintext').setAttribute("href", "./index.html");

}
var newfood = document.getElementById('new')
newfood.onclick= function(){
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('images').value;

    //returns a promise which is a reponse to a request   
    fetch(`${url}/menu`,{
        method: 'POST',
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

        if (data['message'] === 'Food menu created'){
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
}

//function to logout
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
