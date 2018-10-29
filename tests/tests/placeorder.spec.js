//Checks if the page for placing an order has been rendered correctly
describe('Place order page', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8080/userindex.html')
    });
  
    it('Meals and a checkout should be displayed on the users dashboard', async () => {
      const orderPage = await page.evaluate(() => {
          let menu = document.getElementById('usermenu')
          let makeorder = document.getElementById('makeOrder')
          let cart = document.getElementById('myCart')
          let name = document.getElementById('cartname')
          let price = document.getElementById('cartprice')      
          return { "menu": menu,
                   "makeorder": makeorder,
                   "cart": cart,
                   "name": name,
                   "price": price
                }
  
    })

    expect(orderPage["menu"]).toBeDefined()
    expect(orderPage["makeorder"]).toBeDefined();
    expect(orderPage["cart"]).toBeDefined();
    expect(orderPage["name"]).toBeDefined();
    expect(orderPage["price"]).toBeDefined();

    })
});



// // CHeck whether the new meal page is being rendered
// describe('New meal page', () => {
//   beforeAll(async () => {
//     await page.goto('http://127.0.0.1:8080/newfood.html')
//   });

//   it('Rendering of the new meal page', async () => {
//     const newmeal = await page.evaluate(() => {
//         let name = document.getElementById('name').innerHTML
//         let description = document.getElementById('description').innerHTML
//         let price = document.getElementById('price')   
//         let images = document.getElementById('images')
//         let clickBtn = document.getElementById('new').innerHTML


//         return { "name": name,
//                  "description": description,
//                  "price": price,
//                  "images": images,
//                  "newBtn": clickBtn}

//   })

//   expect(newmeal["name"]).toBeDefined();
//   expect(newmeal["description"]).toBeDefined();
//   expect(newmeal["price"]).toBeDefined();
//   expect(newmeal["images"]).toBeDefined();
//   expect(newmeal["newBtn"]).toBe("Add new");


//   })
// });

//Test the functionality of creating a new meal
// describe('New meal', () => {
//   beforeAll(async () => {
//     try {
//      const pg =  await page.goto('http://127.0.0.1:8080/newfood.html')
//     } catch (error) {
//       console.log(error)
//     }
    
//   });

//   it('Admin should be able to create a new meal', async () => {
//     // console.log('pg', page);
//     const meal = {
//       name: '',
//       description: 'Cheese',
//       image: 'Burger',
//       price: '200'
//     }
   
//     await page.type('#name', meal.name)
//     await page.type('#description', meal.description)
//     await page.type('#price',meal.image)
//     await page.type('#images', meal.price)
//     await page.click('#new')



//     await page.waitForSelector('#newoutput');
    
//     const message = await page.$eval('#newoutput', mess => (mess));
//     expect(message).toMatch("Food menu created");




// }) 

// })
