var accept = document.getElementById('accept')


accept.onclick= function(){
    let username = document.getElementById('status').value;


    fetch('http://127.0.0.1:5000/api/v2/update/order/<int:id>',{
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
