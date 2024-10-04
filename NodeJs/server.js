
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Initialize express app
const app = express();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'images');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);  // Create the folder if it doesn't exist
    }
    cb(null, uploadPath);  // Store in the 'images' folder
  },
  filename: (req, file, cb) => {
    // Store the file with the original name
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });
app.use(express.json());
// Serve the index.html file
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
  console.log(req.ip);
});

app.get('/second', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'secondPage.html'));
  console.log(req.ip);
});


// Handle the POST request to accept name and file
app.post('/upload', upload.single('file'), (req, res) => {
  console.log("server hit");
  const { name } = req.body;  // Get user's name from form data
  const file = req.file;      // Get the uploaded file info from multer

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  // Log the received data
  console.log("Received Client Info: ", { name, file: file.filename });

  // Respond back to the client with success message
  res.status(200).json({ message: 'File uploaded successfully!', name, filename: file.filename });
});


app.post('/upload',  (req, res) => {
  //const { name } = req.body;  // Get user's name from form data
        // Get the uploaded file info from multer

  console.log("Received Client Info: ", req.body.name);

  // Respond back to the client with success message
  res.status(200).json({message: 'File uploaded successfully!'});
});





// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
