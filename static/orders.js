window.onload = function(){

fetch('http://127.0.0.1:5000/api/v2/orders',{
    metdod: 'GET',
    mode:'cors',
    headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

            }
})
.then(res=>res.json())
.then(data =>{
    let output = '';
    console.log(data)
    data["Food Orders"].forEach(res=>{
        output +=` <table id="tablee">
                        <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>food_name</th>
                        <th>description</th>
                        <th>price</th>
                        <th>current status</th>
                        </tr>

                        <tr>
                        <td>${res['id']}</td>
                        <td>${res['username']}</td>
                        <td>${res['food_name']}</td>
                        <td>${res['description']}</td>
                        <td>${res['price']}</td>
                        <td>${res['status']}</td>
                        </tr>
                    </table>`
    }) 
    document.getElementById("container").innerHTML = output;
})}

