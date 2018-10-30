//function to register a new user
var signup = document.getElementById('signup')

signup.onclick= function(){
    document.getElementById('account_not_created').style.display='none';
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirmPassword').value;

    fetch(`${url}/auth/signup`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "confirm_password": confirm_password})
    })

    .then(res => res.json())
    .then(data => {
        elem = document.getElementById('outputt');
        elem.classList.remove('hidden');  
        let element = document.createElement('p')   
        
        if (data['message'] === 'successfully created a new account'){
            element.innerHTML =  "Successfully created a new account";
            element.id = "theoutput"
            elem.appendChild(element)

            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 3000);  

            setTimeout(() => {
                redirect: window.location.replace("./login.html");}, 1900); 
                
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";

        }
        else{
            element.innerHTML =  `${data["message"]}`;
            element.id = "theoutput"
            elem.appendChild(element)
          
            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 3000); 
            
            setTimeout(() => {
                location.reload();}, 1900);  
            
        }

    })
}
