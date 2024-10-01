const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.reduceimages.com/signup.php');

   
    await page.type('input[name=email]', 'lulugive@azuretechtalk.net');
    await page.type('input[name=password]', 'Q3');
    await page.type('input[id=signup_checkbox_agree]', '1');
    await page.click('button[type=submit]');
try {
    
    await page.waitForNavigation({ waitUntil: 'networkidle0' });


    console.log("Form submitted successfully!");

   
    const currentUrl = page.url();
    console.log("Current URL:", currentUrl);
    
} catch (error) {
    console.error("Form submission failed or timed out:", error);
}
    await browser.close();
})();
















// const puppeteer = require('puppeteer');
// (async () => {
//     const browser = await puppeteer.launch({ headless: false }); // Headless false to see the browser action
//     const page = await browser.newPage();
//     await page.goto('https://www.reduceimages.com/signup.php');

//     // Fill out the form
//     await page.type('input[name=email]', 'biradela.atehiqa@rungel.net');
//     await page.type('input[name=password]', 'Qweasd@123');
    
//     // Check the agreement checkbox
//     await page.click('input[id=signup_checkbox_agree]'); 
    
//     // Click submit button
//     await page.click('button[type=submit]');

//     // Wait for a success indicator (e.g., URL change or a success message)
//     try {
//         // Wait for navigation after submission (in case the page redirects)
//         await page.waitForNavigation({ waitUntil: 'networkidle0' });

//         // Alternatively, wait for a success message element
//         // await page.waitForSelector('.success-message', { timeout: 5000 });

//         console.log("Form submitted successfully!");

//         // Optional: Check the current URL for verification
//         const currentUrl = page.url();
//         console.log("Current URL:", currentUrl);
        
//         // Perform any additional checks for success or failure here
//     } catch (error) {
//         console.error("Form submission failed or timed out:", error);
//     }

//     await browser.close();
// })();






// const puppeteer = require('puppeteer');

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.codechef.com/signup');

//     // Fill out the form
//     await page.type('input[id=edit-username]', 'dkh2001');
//     await page.type('input[name=mail]', 'biradela.atehiqa@rungel.net');
//     await page.type('input[name=password]', 'QWERasd123@');
//     await page.type('input[name=code_of_conduct]', '1');
//     await page.click('button[type=submit]');

//     await browser.close();
// })();
