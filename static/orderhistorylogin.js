var login = document.getElementById('login')
login.onclick= function(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('https://api-version3.herokuapp.com/api/v2/auth/login',{
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
            alert('Successfully logged in') 
            window.localStorage.setItem('token', data['token'])
            console.log(data['admin'])
            if (data['admin'] === true){
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
                redirect: window.location.replace("./orderhistory.html")

            }
            else{
                document.getElementById('username').value = "";
                document.getElementById('password').value = "";
                redirect: window.location.replace("./orderhistory.html")

            }

        }
        else{
            document.getElementById('loginfail').innerHTML= "Invalid username or password";
            document.getElementById('loginfail').style.color='red';
            document.getElementById('loginfail').style.display='block';
        }
    })
}
