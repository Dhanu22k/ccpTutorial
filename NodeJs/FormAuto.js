const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://forms.gle/jNtTXsRg29rH4yfR9');

   
    await page.type('input[aria-labelledby=i1 ]', 'net');//name
    await page.type('input[aria-labelledby=i5 ]', 'net');//Date of birth
    await page.type('input[aria-labelledby=i9 ]', 'net');//city
    await page.type('input[aria-labelledby=i13 ]', 'net');//state
    await page.click('div[role=button]');
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
//     const browser = await puppeteer.launch({
//         headless: true, // Set to true to run in headless mode
//     });
//     const page = await browser.newPage();
//     await page.goto('https://forms.office.com/r/CVWC7Jqqxk');

//     await page.type('input[aria-labelledby="QuestionId_ra0d805c2edc948daba925b5e3ad475e6"]', 'John Doe');

//     // Fill in the Email
//     await page.type('input[aria-labelledby="QuestionId_rccee2f083f6b479f8a27b0702666402c QuestionInfo_rccee2f083f6b479f8a27b0702666402c"]', 'johndoe@example.com');

//     // Fill in the Age
//     await page.type('input[aria-labelledby="QuestionId_rd2b3853d77c64217a00ed3ee09e5e1b5 QuestionInfo_rd2b3853d77c64217a00ed3ee09e5e1b5"]', '30');

//     // Fill in the Address
//     await page.type('input[aria-labelledby="QuestionId_r05f8e92e95d7470ea5b7b95939716f20 QuestionInfo_r05f8e92e95d7470ea5b7b95939716f20"]', '123 Main St, Cityville');

//     // Click the Submit button
//     await page.click('button[data-automation-id="submitButton"]');

//     try {
//         await page.waitForNavigation({ waitUntil: 'networkidle0' });
//         console.log("Form submitted successfully!");
//         const currentUrl = page.url();
//         console.log("Current URL:", currentUrl);
//     } catch (error) {
//         console.error("Form submission failed or timed out:", error);
//     }

//     await browser.close();
// })();

