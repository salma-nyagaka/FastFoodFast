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
