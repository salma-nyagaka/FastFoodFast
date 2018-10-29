// Test the functionality of a login page
describe('User login ', () => {
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
})

describe('User login ', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/login.html')
  });

  it('User should be able to login with correct credentials', async () => {
    const login = {

      username: 'Admin',
      password: '',

    };

    await page.type('#username', login.username)
    await page.type('#password', login.password)
    await page.click('#login')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("Password cannot be left blank");
}) 
})

describe('User login ', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/login.html')
  });

  it('User should be able to login with correct credentials', async () => {
    const login = {

      username: 'Admin',
      password: 'Admin1234',

    };

    await page.type('#username', login.username)
    await page.type('#password', login.password)
    await page.click('#login')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("Wrong password");
}) 
})

describe('User login ', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/login.html')
  });

  it('User should be able to login with correct credentials', async () => {
    const login = {

      username: '',
      password: 'Admin1234',

    };

    await page.type('#username', login.username)
    await page.type('#password', login.password)
    await page.click('#login')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("Username cannot be left blank");
}) 
})

describe('User login', () => {
  beforeAll(async () => {

    await page.goto('http://127.0.0.1:8080/login.html')
  });

  it('User should be able to login with correct credentials', async () => {
    const login = {

      username: 'Admin1',
      password: 'Admin123',

    };

    await page.type('#username', login.username)
    await page.type('#password', login.password)
    await page.click('#login')


    await page.waitForSelector('#theoutput');
      const message = await page.$eval('#theoutput', mess => (mess.innerHTML
   ));
    expect(message).toMatch("user does not exist");
}) 
})


