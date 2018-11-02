// Test the functionality of s signup page
describe('User sign up', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/signup.html')
  });

  it('User should be able to register with correct credentials', async () => {
    const signup = {

      username: 'salma nyagaka',
      email: 'salma@gmail.com',
      password: 'dreamweaver',
      confirmpassword: 'dreamweaver'

    };
 
    await page.type('#username', signup.username)
    await page.type('#password', signup.password)
    await page.type('#confirmPassword',signup.confirmpassword)
    await page.type('#email', signup.email)
    await page.click('#signup')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch('Username exists');     
    
    })
    
}) 

describe('User sign up', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/signup.html')
  });

  it('User should be able to register with correct credentials', async () => {
    const signup = {

      username: 'salma nyagaka',
      email: 'salma@gmail.com',
      password: 'dreamweaver',
      confirmpassword: 'dreamweaver'

    };
 
    await page.type('#username', signup.username)
    await page.type('#password', signup.password)
    await page.type('#confirmPassword',signup.confirmpassword)
    await page.type('#email', signup.email)
    await page.click('#signup')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch('Username exists');  
    
    })
    
}) 

describe('User sign up', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/signup.html')
  });

  it('Name field cannot be left blank', async () => {
    const signup = {

      username: '',
      email: 'salma@gmail.com',
      password: 'dreamweaver',
      confirmpassword: 'dreamweaver'

    };
 
    await page.type('#username', signup.username)
    await page.type('#password', signup.password)
    await page.type('#confirmPassword',signup.confirmpassword)
    await page.type('#email', signup.email)
    await page.click('#signup')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch('Username cannot be left blank');  
    
    })
    
}) 

describe('User sign up', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/signup.html')
  });

  it('Email field cannot be left blank', async () => {
    const signup = {

      username: 'salmanyagaka',
      email: '',
      password: 'dreamweaver',
      confirmpassword: 'dreamweaver'

    };
 
    await page.type('#username', signup.username)
    await page.type('#password', signup.password)
    await page.type('#confirmPassword',signup.confirmpassword)
    await page.type('#email', signup.email)
    await page.click('#signup')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch('Email cannot be left blank');  
    
    })
    
}) 

describe('User sign up', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/signup.html')
  });

  it('Password field should not be left blank', async () => {
    const signup = {

      username: 'salma nyagaka',
      email: 'salma@gmail.com',
      password: '',
      confirmpassword: ''

    };
 
    await page.type('#username', signup.username)
    await page.type('#password', signup.password)
    await page.type('#confirmPassword',signup.confirmpassword)
    await page.type('#email', signup.email)
    await page.click('#signup')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch('Password cannot be left blank');  
    
    })
    
}) 

