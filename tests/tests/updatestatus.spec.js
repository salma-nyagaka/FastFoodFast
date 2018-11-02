//Checks if the get all order status page has been rendered correctly
describe('page', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8080/accept.html')
    });
  
    it('The table layout should appear to add new meal', async () => {
      const allOrderStatus = await page.evaluate(() => {
          let tablee = document.getElementById('tablee')
          let acceptBtn = document.getElementById('Accept')
          let declineBtn = document.getElementById('Decline')

          return { "table": tablee,
                   "acceptBtn": acceptBtn,
                   "declineBtn": declineBtn,
                }
  
    })

    expect(allOrderStatus["table"]).toBeDefined();
    expect(allOrderStatus["acceptBtn"]).toBeDefined();
    expect(allOrderStatus["declineBtn"]).toBeDefined();

    })
});

describe('page', () => {
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

    await page.goto('http://127.0.0.1:8080/accept.html')
  });

  it('Admin should be able to get the available orders', async () => {
 
    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("These are the available orders");
    })
})
})
