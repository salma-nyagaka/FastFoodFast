var newfood = document.getElementById('new')


newfood.onclick= function(){
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;


    fetch('http://127.0.0.1:5000/api/v2/menu',{
        method: 'POST',
        mode:'cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name,
            "description": description,
            "price": price})
    })
    .then(res => res.json())
    .then(data => {console.log(data)
        if (data['message'] === 'Food menu created'){
            document.getElementById('name').value = "name";
            document.getElementById('description').value = "description";
            document.getElementById('price').value = "price";}
        else{
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = "";
        }

    })
}
