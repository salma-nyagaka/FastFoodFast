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




