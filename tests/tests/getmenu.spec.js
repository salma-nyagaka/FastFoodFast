//Checks if the page for getting menu has been rendered correctly
describe('Get all menu', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8080/adminindex.html')
    });
  
    it('Meals should be displayed correctly', async () =>  {
        const menu = await page.evaluate(() => {

          let menu = document.getElementById('adminmenu')
          let name = document.getElementById('menuname')
          let price = document.getElementById('menuprice')

          return { "menu": menu,
                   "name": name,
                   "price": price
                }
  
    })

    expect(menu["menu"]).toBeDefined()
    expect(menu["name"]).toBeDefined();
    expect(menu["price"]).toBeDefined();

    })
});
  