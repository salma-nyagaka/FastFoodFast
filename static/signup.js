var register = document.getElementById('register')


register.onclick= function(){
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirmPassword').value;

    fetch('http://127.0.0.1:5000/api/v2/auth/signup',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "confirm_password": confirm_password})
    })
    .then(res => res.json())
    .then(data => {console.log(data)
        if (data['message'] === 'successfully created a new account'){
            alert('Successfully signed up') 
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
        }
        else{
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
        }

    })
}
