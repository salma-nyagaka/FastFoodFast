var login = document.getElementById('login')
login.onclick= function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let displayWindow = document.getElementById('output')
    
    let loadingWindow = document.getElementById('loader')
    element = document.getElementById('loader');



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
        displayWindow.classList.remove('hidden');
  
        if (data['message'] === 'successfully logged in'){    
            window.localStorage.setItem('token', data['token'])
         
                if (data['admin'] === true){ 
                    window.localStorage.setItem('token', data['token'])
 

                window.localStorage.setItem('username', data['username'])
                window.localStorage.setItem('password', data['password'])
                
                let element = document.createElement('p')
                element.innerHTML =  "Successfully logged in";
                element.id = "theoutput"
                document.getElementById('output').appendChild(element)
    
                setTimeout(() => {
                    element.parentNode.removeChild(element);
                }, 2000);  
  
                setTimeout(() => {
                redirect: window.location.replace("./adminindex.html");}, 1900); 
                     
                }

                else{
                    window.localStorage.setItem('username', data['username'])
                    window.localStorage.setItem('password', data['password'])

                    let element = document.createElement('p')
                    element.innerHTML =  "Successfully logged in";
                    element.id = "theoutput"
                    document.getElementById('output').appendChild(element)
        
                    setTimeout(() => {
                        element.parentNode.removeChild(element);
                    }, 2000);  

                    setTimeout(() => {
                    redirect: window.location.replace("./userindex.html");}, 1900);  
                    document.getElementById('username').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('password').value = "";
                    document.getElementById('confirmPassword').value = "";       
                    
                }

        
        }
        else{
            let element = document.createElement('p')
            element.innerHTML =  `${data["message"]}`;
            element.id = "theoutput"
            document.getElementById('output').appendChild(element)
          
            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 2000); 
            
            setTimeout(() => {
                location.reload();}, 1900); 
                document.getElementById('username').value = "";
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                document.getElementById('confirmPassword').value = ""; 

        }
    })
}
