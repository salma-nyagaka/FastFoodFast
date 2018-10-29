var newfood = document.getElementById('new')
newfood.onclick= function(){
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('images').value;
    let displayWindow = document.getElementById('dialog')


    
    fetch('https://createorders-api.herokuapp.com/api/v2/menu',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
        },
        body: JSON.stringify({
            "name": name,
            "description": description,
            "price": price,
            "image": image})
    })
    .then(res => res.json())
    .then(data => {
        elem = document.getElementById('dialog');
        displayWindow.classList.remove('hidden');

        if (data['message'] === 'Food menu created'){
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = ""; 
            document.getElementById('images').value = "";  
                    
            let element = document.createElement('p')
            element.innerHTML =  "Food menu created";
            element.id = "theoutput"
            document.getElementById('dialog').appendChild(element)

            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 3000000);  


            setTimeout(() => {
                location.reload();}, 30000000000);                                   
             
        }
        else{
            let element = document.createElement('p')
            element.innerHTML =  `${data["message"]}`;
            element.id = "newoutput"
            document.getElementById('dialog').appendChild(element)
          
            setTimeout(() => {
                element.parentNode.removeChild(element);
            }, 3000); 
            
            setTimeout(() => {
                location.reload();}, 1000);  

            
          }

    })
}