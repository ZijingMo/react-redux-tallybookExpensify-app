const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000; // This variable is for Heroku or localhost

app.use(express.static(publicPath));

// The method get() lets us set up some function to run when someone makes a request to our server (Refresh will work)
// The first argument '*' means all path can be passed.
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up.');
});