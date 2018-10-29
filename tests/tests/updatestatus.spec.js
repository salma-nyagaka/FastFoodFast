//Checks if the get all order status page has been rendered correctly
describe(' page', () => {
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
