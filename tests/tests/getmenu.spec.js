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

describe('Get the menu', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/login.html')
  });

  it('User should be able to login with correct credentials', async () => {
    const login = {

      username: 'Admin',
      password: 'Admin123',

    };

    await page.type('#username', login.username)
    await page.type('#password', login.password)
    await page.click('#login')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("Successfully logged in");
})


describe('Get the menu', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/adminindex.html')
  });

  it('Admin should be able to get the menu', async () => {
 
    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("These are the available meals");
    })
  })
})


  