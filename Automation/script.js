const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const path = require('path');

// Function to read data from Excel
const readExcelData = (filePath) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data; // Returns an array of objects (each object representing a row)
};

(async () => {
    // Read data from Excel file (Name and ImagePath columns)
    const data = readExcelData('clientData.xlsx'); // Replace with your Excel file name

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true }); // Set to false to see the browser actions
    const page = await browser.newPage();

    // Loop through each row of data from the Excel sheet
    for (const entry of data) {
        const Name = entry.Name; // Excel should have 'Name' and 'Path' columns
        const ImagePath = entry.Path;

        // Navigate to the form URL
        await page.goto('https://4000-dhanu22k-ccptutorial-hn1l304skz9.ws-us116.gitpod.io');

        // Fill in the "Name" field
        await page.waitForSelector('#name');
        await page.type('#name', Name);

        // Handle file upload
        const inputFileSelector = '#file';
        const fullImagePath = path.resolve(ImagePath);
        const inputUploadHandle = await page.$(inputFileSelector);

        if (inputUploadHandle) {
            await inputUploadHandle.uploadFile(ImagePath);
            console.log(`File uploaded for: ${Name}`);
        } else {
            console.error(`File input not found for: ${Name}`);
        }

        // Submit the form
        await page.click('button[type=submit]');

        try {
            // Wait for a success message or similar element after submission
            await new Promise(resolve => setTimeout(resolve, 3000)); // 3-second delay after form submission
            console.log(`Form submitted successfully for: ${Name}`);
        } catch (error) {
            console.error(`Form submission failed for: ${Name}. Error:`, error);
        }

        // Wait between submissions
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
    }

    // Close the browser after all forms are submitted
    await browser.close();
})();
