const express = require('express');

const app = express();

const port = 3000;

app.get('/heartbeat', (req, res) => {
    res.json({
        status: 'eat@home server is running'
    })
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on port ${port}`)
})