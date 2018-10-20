var login = document.getElementById('login')
login.onclick= function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let displayWindow = document.getElementById('output')

    fetch(' http://127.0.0.1:5000/api/v2/auth/login',{
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
         
        if (data["message"] === "user does not exist") {
            elem = document.getElementById('output');
            displayWindow.classList.remove('hidden');
            elem.innerHTML ="Username not found";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            document.getElementById('output').style.color = "red";
            setTimeout(() => {
                location.reload();}, 1000);    

        }
        
        if (data["message"] === "Wrong password") {
            elem = document.getElementById('output');
            displayWindow.classList.remove('hidden');
            elem.innerHTML ="Wrong password";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            document.getElementById('output').style.color = "red";
            setTimeout(() => {
                location.reload();}, 1000);    
        }
         
        if (data["message"] === "Username field cannot be left blank") {
            elem = document.getElementById('output');
            displayWindow.classList.remove('hidden');
            elem.innerHTML ="Enter valid pashhhhsword";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 3000);   
            document.getElementById('output').style.color = "red";
            setTimeout(() => {
                location.reload();}, 1000);    
        }


        if (data['message'] === 'successfully logged in'){             
            window.localStorage.setItem('token', data['token'])


            if (data['admin'] === true){  
                window.localStorage.setItem('username', data['username'])
                window.localStorage.setItem('password', data['password'])
                
                elem = document.getElementById('output');
                displayWindow.classList.remove('hidden');
                elem.innerHTML ="Successfullly logged in";
                setTimeout(() => {
                    elem.parentNode.removeChild(elem);
                }, 2000);   
                setTimeout(() => {
                redirect: window.location.replace("./adminindex.html");}, 1900);         
            }
            else{
                window.localStorage.setItem('username', data['username'])
                window.localStorage.setItem('password', data['password'])

                elem = document.getElementById('output');
                displayWindow.classList.remove('hidden');
                elem.innerHTML ="Successfullly logged in";
                setTimeout(() => {
                    elem.parentNode.removeChild(elem);
                }, 2000);   
                setTimeout(() => {
                redirect: window.location.replace("./userindex.html");}, 1900);  

            }

        }
    })
}
