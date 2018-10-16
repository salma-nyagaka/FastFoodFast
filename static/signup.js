var signup = document.getElementById('signup')

signup.onclick= function(){
    document.getElementById('account_not_created').style.display='none';
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirmPassword').value;

    fetch('https://createorders-api.herokuapp.com/api/v2/auth/signup',{
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
        if (data["message"] === "Password do not match") {
            document.getElementById('outputt').innerHTML =
            "Password do not match";
            document.getElementById('outputt').style.color = "red";
        }
        if (data["message"] === "Password is too short") {
            document.getElementById('outputt').innerHTML =
            "Password is too short";
            document.getElementById('outputt').style.color = "red";
        }
        if (data["message"] === "Username is too short") {
            document.getElementById('outputt').innerHTML =
            "Username is too short";
            document.getElementById('outputt').style.color = "red";
        }
        if (data["message"] === "Enter valid username") {
            document.getElementById('outputt').innerHTML =
            "Enter valid username";
            document.getElementById('outputt').style.color = "red";
        }

        if (data["message"] === "Enter valid password") {
            document.getElementById('outputt').innerHTML =
            "Enter valid password";
            document.getElementById('outputt').style.color = "red";
        }

        if (data["message"] === "Enter valid email") {
            document.getElementById('outputt').innerHTML =
            "Enter valid email";
            document.getElementById('outputt').style.color = "red";
        }

        if (data["message"] === "Username exists") {
            document.getElementById('outputt').innerHTML =
            "Username exists";
            document.getElementById('outputt').style.color = "red";
        }

        if (data["message"] === "Email address exists") {
            document.getElementById('outputt').innerHTML =
            "Email address exists";
            document.getElementById('outputt').style.color = "red";
        }

        if (data['message'] === 'successfully created a new account'){
            document.getElementById('outputt').innerHTML =
            "Successfully created a new account";
            document.getElementById('outputt').style.color = "blue";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";                   

        }
        else{
            document.getElementById('account_not_created').innerHTML= 'User has been not been created, try again';
            document.getElementById('account_not_created').style.color='red';
            document.getElementById('account_not_created').style.display='block';
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
        }

    })
}
