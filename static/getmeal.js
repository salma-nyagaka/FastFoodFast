// window.onload = function(){

//     fetch(`http://127.0.0.1:5000/api/v2/users/menu/${id}`,{
//         method: 'PUT',
//         mode:'cors',
//         headers:{
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json',
//             'Authorization' : 'Bearer ' + window.localStorage.getItem('token')

//                 }
//     })
//     .then(res=>res.json())
//     .then(data =>{
//         let output = '';
//         console.log(data)
//         data["Food menu"].forEach(res=>{
//             output +=` 
//                             <div class="column">
//                                 <img src="./img/baberque.jpeg" alt="Pizza" >
//                                     <div class="colum"  class="bg-1">
//                                         <h2>${res['name']}</h2>
//                                         <p>${res['description']}</p>
//                                         <h2>${res['price']}</h2>
                                        
//                                         <br>
//                                         <button class="ORDER"  onClick="get_meal('${res['id']}')">VIEW</button>

//                                         <button class="ORDER"  onClick="delete_meal('${res['id']}')">DELETE</button>
//                                     </div>
//                             </div>`
                       
//         }) 
//         document.getElementById("container").innerHTML = output;
//     })}


//     fetch(`http://127.0.0.1:5000/api/v2/menu/${id}`,{
//         method: 'PUT',
//         headers: {
//             'Access-Control-Allow-Origin': '*',

//             'Content-Type': 'application/json',
//             'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
//         },
//         body: JSON.stringify({
//             "name": name,
//             "description": description,
//             "price": price
//            })
//     })
//     .then(res=> res.json())
//     .then(data=>{
//         alert('Meal updated')
//     })
// }

