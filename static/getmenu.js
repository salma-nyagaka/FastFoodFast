var menu = document.getElementById('menu')

menu.onclick= function(){
    redirect: window.location.replace("./userindex.html")
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
                                        <h2>${res['Pizza']}</h2>
                                        <p>${res['Hawaian pizza']}</p>
                                        <h2>${res['750/=']}</h2>
                                        <br>
                                        <a href="#" ><button>ORDER</button></a>
                                    </div>
                            </div>
                        </div>`
        }) 
        document.getElementById("container").innerHTML = output;
    })}}
    


        