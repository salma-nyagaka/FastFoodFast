// import faker from "faker";

// // Test the functionality of s signup page
// describe('User sign up', () => {
//   beforeAll(async () => {

//     await page.goto('http://127.0.0.1:8080/signup.html')
//   });

//   it('User should be able to register with correct credentials', async () => {
//     const signup = {

//       username: faker.name.firstName(),
//       email: faker.internet.email(),
//       // email: 'salmanyagaaaa@gmail.com',
//       password: 'dreamweaver',
//       confirmpassword: 'dreamweaver'

//     };
//     console.log(faker.name.firstName())
//     console.log(faker.internet.email())



//     await page.type('#username', signup.username)
//     await page.type('#password', signup.password)
//     await page.type('#confirmPassword',signup.confirmpassword)
//     await page.type('#email', signup.email)
//     await page.click('#signup')


//     await page.waitForSelector('#theoutput');
//       const message = await page.$eval('#theoutput', mess => (mess.innerHTML
//    ));
//     expect(message).toMatch("Successfully created a new account");



//     // Test the functionality of s signup page
//     describe('User sign up', () => {
//       beforeAll(async () => {
    
//         await page.goto('http://127.0.0.1:8080/signup.html')
//       });
    
//       it('User should be able to register with correct credentials', async () => {
//         const signup = {
    
//           username: 'faker.name.firstName()',
//           // email: faker.internet.email(),
//           email: 'salmanyagdaaaa@gmail.com',
//           password: 'dreamweaver',
//           confirmpassword: 'dreamweaver'
    
//         };
//         console.log(faker.name.firstName())
//         console.log(faker.internet.email())
    
    
    
//         await page.type('#username', signup.username)
//         await page.type('#password', signup.password)
//         await page.type('#confirmPassword',signup.confirmpassword)
//         await page.type('#email', signup.email)
//         await page.click('#signup')
    
    
//         await page.waitForSelector('#theoutput');
//           const message = await page.$eval('#theoutput', mess => (mess.innerHTML
//        ));
//         expect(message).toMatch("Successfully created a new account");
    
    
    
//     }) 
//     afterEach(() => {
//       clearUser();
//     });
    
    
//     })
    
// }) 

// })
