//Checks if the order history page has been rendered correctly
describe('Order history page', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8080/orderhistory.html')
    });
  
    it('Elements should be displayed', async () => {
      const orderhistory = await page.evaluate(() => {
        
          let table = document.getElementById('tablee')   
         return { "table": table}
  
    })

    expect(orderhistory["table"]).toBeDefined()
  

    })
});

describe('Ge', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/login.html')
  });

  it('User should be able to login', async () => {
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


})

