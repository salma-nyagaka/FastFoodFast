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

describe('New meal', () => {
  beforeEach(async () => {

    await page.goto('http://127.0.0.1:8080/newfood.html')
  });

    it('Two meals with the same name should not be created', async () => {

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


      await page.waitForSelector('#theoutput');
        const message = await page.$eval('#theoutput', mess => (mess.innerHTML
    ));

      expect(message).toMatch("This food already exists");

      }) 

    })
  

describe('New meal', () => {
    beforeEach(async () => {
  
      await page.goto('http://127.0.0.1:8080/newfood.html')
    });
  
  
  
      it('Name field cannot be left blank', async () => {
  
        const meal = {
          name: '',
          description: 'Cheese',
          image: 'Burger',
          price: '200'
        }
        
        await page.type('#name', meal.name)
        await page.type('#description', meal.description)
        await page.type('#images', meal.image)
        await page.type('#price', meal.price)
        await page.click('#new')
  
  
        await page.waitForSelector('#theoutput');
          const message = await page.$eval('#theoutput', mess => (mess.innerHTML
      ));
  
        expect(message).toMatch("Name cannot be left blank");
  
        }) 
  
      })


  describe('New meal', () => {
    beforeEach(async () => {
  
      await page.goto('http://127.0.0.1:8080/newfood.html')
    });
  
  
  
      it('Description field cannot be left blank', async () => {
  
        const meal = {
          name: 'Chips',
          description: '',
          image: 'Burger',
          price: '200'
        }
        
        await page.type('#name', meal.name)
        await page.type('#description', meal.description)
        await page.type('#images', meal.image)
        await page.type('#price', meal.price)
        await page.click('#new')
  
  
        await page.waitForSelector('#theoutput');
          const message = await page.$eval('#theoutput', mess => (mess.innerHTML
      ));
  
        expect(message).toMatch("Description cannot be left blank");
  
        }) 
  
      }) 
})


