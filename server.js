const express = require('express');
const loginRoutes = require('./routes/loginRoutes');
const app = express();
loginRoutes(app);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('running on port 5000')
})