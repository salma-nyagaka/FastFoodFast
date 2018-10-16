var accept = document.getElementById('accept')


accept.onclick= function(){
    let username = document.getElementById('status').value;


    fetch('https://createorders-api.herokuapp.com/api/v2/update/order/<int:id>',{
        method: 'PUT',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

        },
        body: JSON.stringify({
            "status": "accept"})
    })
   
}


var logout = document.getElementById('signintext')
logout.onclick = function(){
    if (window.localStorage.getItem('username') == null){
        redirect: window.location.replace("./login.html");
    }

    else{
        localStorage.clear();
        redirect: window.location.replace("./index.html");
    }
}
