var login = document.getElementById('login')


login.onclick= function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('http://127.0.0.1:5000/api/v2/auth/login',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password})
    })
    .then(res => res.json())
    .then(data => {
        if (data['message'] === 'successfully logged in'){
            window.localStorage.setItem('token', data['token'])
            console.log(data['admin'])
            if (data['admin'] === true){
                redirect: window.location.replace("./adminindex.html")
            }
            else{
                redirect: window.location.replace("./checkout.html")
            }

        }
        else{
            document.getElementById('loginfail').innerHTML= "Invalid username or password";
            document.getElementById('loginfail').style.color='red';
            document.getElementById('loginfail').style.display='block';
        }
    })
}