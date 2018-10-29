// Check whether the new meal page is being rendered
describe('New meal page', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080/newfood.html')
    
  });

  it('Rendering of the new meal page', async () => {
    const newmeal = await page.evaluate(() => {
        let name = document.getElementById('name').innerHTML
        let description = document.getElementById('description').innerHTML
        let price = document.getElementById('price')   
        let images = document.getElementById('images')
        let clickBtn = document.getElementById('new').innerHTML


        return { "name": name,
                 "description": description,
                 "price": price,
                 "images": images,
                 "newBtn": clickBtn}

  })

  expect(newmeal["name"]).toBeDefined();
  expect(newmeal["description"]).toBeDefined();
  expect(newmeal["price"]).toBeDefined();
  expect(newmeal["images"]).toBeDefined();
  expect(newmeal["newBtn"]).toBeDefined();


  })
});

// Test the functionality of creating a new meal
describe('New meal', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/newfood.html')
  });

  it('Admin should be able to create a new meal', async () => {
     const meal = {
      name: 'Burger',
      description: 'Cheese',
      image: 'Burger',
      price: '200'
    }
    
    await page.type('#name', meal.name)
    await page.type('#description', meal.description)
    await page.type('#images', meal.image)
    await page.type('#price', meal.price)
    await page.click('#new')


    await page.waitForSelector('#newoutput');
      const message = await page.$eval('#newoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("The new meal has been created");



}) 
})
