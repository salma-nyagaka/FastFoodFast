var signup = document.getElementById('signup')

signup.onclick= function(){
    document.getElementById('account_not_created').style.display='none';
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirmPassword').value;
    let displayWindow = document.getElementById('outputt')
    // let loadingWindow = document.getElementById('loader')
    // element = document.getElementById('loader');

    fetch('https://createorders-api.herokuapp.com/api/v2/auth/signup',{
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
        displayWindow.classList.remove('hidden');      
        
        if (data['message'] === 'successfully created a new account'){
            let element = document.createElement('p')
            element.innerHTML =  "Successfully created a new account";
            element.id = "theoutput"
            document.getElementById('outputt').appendChild(element)

            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 3000);  

            setTimeout(() => {
                location.reload();}, 1000);  
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
        }
        else{
            let element = document.createElement('p')
            element.innerHTML =  `${data["message"]}`;
            element.id = "theoutput"
            document.getElementById('outputt').appendChild(element)
          
            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 3000); 
            
            setTimeout(() => {
                location.reload();}, 1000);  
            
        }

    })
}
