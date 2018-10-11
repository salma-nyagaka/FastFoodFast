window.onload = function(){

    fetch('http://127.0.0.1:5000/api/v2/users/menu',{
        method: 'GET',
        mode:'cors',
        headers:{
            'Access-Control-Allow-Origin': '*',

            'Content-Type': 'application/json',
                }
    })
    .then(res=>res.json())
    .then(data =>{
        let output = '';
        console.log(data)
        data["food_menu"].forEach(res=>{
            
            output +=`  <div class="row">
                            <div class="column">
                                <img src="./img/baberque.jpeg" alt="Pizza" >
                                    <div class="colum"  class="bg-1">
                                        <h2>${res['name']}</h2>
                                        <p>${res['description']}</p>
                                        <h2>${res['price']}</h2>
                                        <br>
                                        <button onclick="food_order(${res['name']})">ORDER</button>
                                    </div>
                            </div>
                        </div>`
        }) 
        document.getElementById("container").innerHTML = output;
    })
}
    



function food_order(name){

    fetch(` http://127.0.0.1:5000/api/v2/users/orders`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + window.localStorage.getItem('token')
        },
    })
    .then(res=> res.json())
    .then(data=>{
        alert(data['message'] === 'order placed sucessfully')
    })
}




        