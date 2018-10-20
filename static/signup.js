var signup = document.getElementById('signup')

signup.onclick= function(){
    document.getElementById('account_not_created').style.display='none';
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirmPassword').value;
    let displayWindow = document.getElementById('outputt')


    fetch(' http://127.0.0.1:5000/api/v2/auth/signup',{
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
    .then(data => {
        if (data["message"] === "Password do not match") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Password do not match";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);   
        }


        if (data["message"] === "Password is too short") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Password do not match";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);  
                
        }
        if (data["message"] === "Username is too short") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Username must be more than 6 characters";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);   

        }
        if (data["message"] === "Enter valid username") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Username can only contain alphanumerics";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);  
        }

        if (data["message"] === "Enter valid password") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Passwords can only contain alphanumerics";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);  
        }

        if (data["message"] === "Enter valid email") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Enter valid email";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);  
        }

        if (data["message"] === "Username exists") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Username exists";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);  
        }

        if (data["message"] === "Email address exists") {
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Email address exists";
            document.getElementById('outputt').style.color = "red";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);  
        }

        if (data['message'] === 'successfully created a new account'){
            elem = document.getElementById('outputt');
            displayWindow.classList.remove('hidden');
            elem.innerHTML = "Successfully created a new account";
            document.getElementById('outputt').style.color = "blue";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            setTimeout(() => {
                location.reload();}, 1000);  
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
        }
        else{
            document.getElementById('account_not_created').innerHTML= 'ACCOUNT NOT CREATED';
            document.getElementById('account_not_created').style.color='red';
            document.getElementById('account_not_created').style.display='block';
            document.getElementById('username').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirmPassword').value = "";
        }

    })
}
