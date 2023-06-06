const express = require ('express');
const init = require('./js/index')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

init();