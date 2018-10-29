//function to login a user
var login = document.getElementById('login')
login.onclick= function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let displayWindow = document.getElementById('output')
    
    let loadingWindow = document.getElementById('loader')
    element = document.getElementById('loader');


     
    //returns a promise which is a reponse to a request 
    fetch('https://createorders-api.herokuapp.com/api/v2/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password})
    })

    
    .then(res => res.json())
    .then(data => {
         
        elem = document.getElementById('output');
        element = document.createElement('p')
        elem.classList.remove('hidden');
  
        if (data['message'] === 'successfully logged in'){    
            window.localStorage.setItem('token', data['token'])
         
                //if admin redirect to admin index
                if (data['admin'] === true){ 
                    window.localStorage.setItem('token', data['token'])
 

                window.localStorage.setItem('username', data['username'])
                window.localStorage.setItem('password', data['password'])
                
               
                element.innerHTML =  "Successfully logged in";
                element.id = "theoutput"
                elem.appendChild(element)
    
                setTimeout(() => {
                    element.parentNode.removeChild(element);
                }, 3000);  
  
                setTimeout(() => {
                redirect: window.location.replace("./adminindex.html");}, 1900);         
                }

                //if user redirect to user dashboard
                else{
                    window.localStorage.setItem('username', data['username'])
                    window.localStorage.setItem('password', data['password'])

                    element.innerHTML =  "Successfully logged in";
                    element.id = "theoutput"
                    elem.appendChild(element)
        
                    setTimeout(() => {
                        element.parentNode.removeChild(element);
                    }, 3000);  

                    setTimeout(() => {
                    redirect: window.location.replace("./userindex.html");}, 1900);         
                    
                }

        
        }

        else{
            element.innerHTML =  `${data["message"]}`;
            element.id = "theoutput"
            elem.appendChild(element)
          
            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 3000); 
            
            setTimeout(() => {
                location.reload();}, 1000);  

        }
    })
}
