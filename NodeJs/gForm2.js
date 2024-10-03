const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const path = require('path');

// Function to read data from Excel
const readExcelData = (filePath) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data; // Returns an array of objects
};

// Function to format the date (YYYY-MM-DD to MM/DD/YYYY)
const formatDate = (dob) => {
    const date = new Date(dob);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};

(async () => {
    // Read data from Excel
    const data = readExcelData('data2.xlsx');

    const browser = await puppeteer.launch({ headless: true }); // Headless set to false for testing
    const page = await browser.newPage();

    for (const entry of data) {
        // Navigate to the form
        await page.goto('https://forms.gle/r5TSTm74YWBAALbu7');

        // Wait for the input fields to load
        await page.waitForSelector('input[type=text]', { timeout: 3000 });

        // Fill in the form fields
        await page.type('input[type=text][jsname="YPqjbf"]', entry.Name || ''); // Name
        // Format and enter Date of Birth
        const formattedDOB = formatDate(entry.DOB || '');
        await page.type('input[aria-labelledby=i9]', formattedDOB); // Date of Birth

        await page.type('input[type=text][jsname="YPqjbf"]', entry.City || ''); // City
        await page.type('input[type=text][jsname="YPqjbf"]', entry.State || ''); // State

        // Upload image
        const inputFileSelector = 'input[type="file"][jsname="G1bupd"]'; // Use the appropriate selector for file input
        const imagePath = path.resolve(__dirname, 'img', 'your-image.jpg'); // Replace 'your-image.jpg' with the actual image name
        const inputUploadHandle = await page.$(inputFileSelector);
        await inputUploadHandle.uploadFile(imagePath);

        console.log(`Image uploaded for: ${entry.Name}`);

        // Click the submit button
        await page.click('div[role=button]');

        try {
            // Wait for navigation to confirm submission
            await page.waitForNavigation({ waitUntil: 'networkidle0' });
            console.log(`Form submitted successfully for: ${entry.Name}`);
        } catch (error) {
            console.error(`Form submission failed for: ${entry.Name}. Error:`, error);
        }
    }

    await browser.close();
})();
