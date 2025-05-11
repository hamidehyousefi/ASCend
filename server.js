const express = require('express');
const path = require('path');
const app = express();

// همه فایل‌های استاتیک در فولدر build
app.use(express.static(path.join(__dirname, 'build')));

// هر روت دیگری → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
