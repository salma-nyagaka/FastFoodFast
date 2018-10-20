

var newfood = document.getElementById('new')
newfood.onclick= function(){
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('images').value;

    
    fetch(' http://127.0.0.1:5000/api/v2/menu',{
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
        if (data["message"] === "Enter valid food name") {
            let displayWindow = document.getElementById('dialog') 
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');    
            elem.innerHTML ="Enter valid food name";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            setTimeout(() => {
                location.reload();}, 4000);                                   
             
        }
        if (data["message"] === "Enter valid food description") {
            let displayWindow = document.getElementById('dialog') 
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');    
            elem.innerHTML ="Enter valid food description";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            setTimeout(() => {
                location.reload();}, 4000);                                   
             
        }

        if (data["message"] === "This food already exists") {
            let displayWindow = document.getElementById('dialog') 
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');    
            elem.innerHTML = "This food already exists";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            setTimeout(() => {
                location.reload();}, 4000);   
        }

        if (data["message"] === "Name cannot be left blank") {
            let displayWindow = document.getElementById('dialog') 
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');    
            elem.innerHTML = "Name cannot be left blank";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            setTimeout(() => {
                location.reload();}, 4000);   
        }

        if (data["message"] === "Description cannot be left blank") {
            let displayWindow = document.getElementById('dialog') 
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');    
            elem.innerHTML = "Description cannot be left blank";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            setTimeout(() => {
                location.reload();}, 4000);   
        }

        if (data["message"] === "Image cannot be left blank") {
            let displayWindow = document.getElementById('dialog') 
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');    
            elem.innerHTML = "Image cannot be left blank";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            setTimeout(() => {
                location.reload();}, 4000);   
        }

        if (data['message'] === 'Food menu created'){
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = ""; 
            document.getElementById('images').value = "";  
                    
            let displayWindow = document.getElementById('dialog') 
            elem = document.getElementById('dialog');
            displayWindow.classList.remove('hidden');    
            elem.innerHTML ="The meal has been created";
            setTimeout(() => {
                elem.parentNode.removeChild(elem);
            }, 2000);  
            setTimeout(() => {
                location.reload();}, 4000);                                   
             }

        else{
            document.getElementById('name').value = "";
            document.getElementById('description').value = "";
            document.getElementById('price').value = "";
            
          }

    })
}