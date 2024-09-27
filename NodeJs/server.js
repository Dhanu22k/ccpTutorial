const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
  console.log(req.ip)
});

app.post('/client-info', (req, res) => {
  const clientInfo = req.body;
  console.log("Received Client Info: ", clientInfo);
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT ||4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
