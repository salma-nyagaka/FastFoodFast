//Checks if the login page has been rendered correctly
describe('Login page', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8080/login.html')
    });
  
    it('A message should be displayed on the login page', async () => {
      const loginPage = await page.evaluate(() => {
          let login = document.getElementById('login').innerHTML
          let signup = document.getElementById('sign-up').innerHTML
          let username = document.getElementById('username')   
          let password = document.getElementById('password')  


          return { "login": login,
                   "signup": signup,
                   "username": username,
                   "password": password}
  
    })

    expect(loginPage["login"]).toBe("LOG IN");
    expect(loginPage["signup"]).toBe("Create an account");
    expect(loginPage["username"]).toBeDefined();
    expect(loginPage["password"]).toBeDefined();

    })
});

//Checks if the signup page has been rendered correctly
describe('Signup page', () => {
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:8080/signup.html')
    });
  
    it('A message should be displayed on the login page', async () => {
      const signupPage = await page.evaluate(() => {
          let signup = document.getElementById('signup').innerHTML
          let signin = document.getElementById('sign-in').innerHTML
          let username = document.getElementById('username')   
          let password = document.getElementById('password')  
          let email = document.getElementById('email')  
          let confirmPassword = document.getElementById('confirmPassword')  




          return { "signup": signup,
                   "signin": signin,
                   "username": username,
                   "password": password,
                   "email": email,
                   "confirmPassword": confirmPassword}
  
    })

    expect(signupPage["signup"]).toBe("SIGN UP");
    expect(signupPage["signin"]).toBe("Sign In");
    expect(signupPage["username"]).toBeDefined();
    expect(signupPage["password"]).toBeDefined();
    expect(signupPage["email"]).toBeDefined();
    expect(signupPage["confirmPassword"]).toBeDefined();
    })
});
  