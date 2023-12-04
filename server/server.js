const bodyParser = require('body-parser');
const port = 3001;
const axios = require('axios');

const express = require('express');
const app = express();
const cors = require('cors');

var list;

app.use(bodyParser.json());
app.use(cors());

// Define a simple endpoint


app.get('/get-available-services', (req, res) => {
    axios.get(`http://registry:4004/getList`)
        .then(response => {
            const dataFromFlask = response.data;
            console.log(dataFromFlask)
            res.json(dataFromFlask);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/get-selection', (req, res) => {

    const { containerName, containerPort, endpoint } = req.query;

    axios.get(`http://${containerName}:${containerPort}/${endpoint}`)
        .then(response => {
            const dataFromFlask = response.data;
            console.log(dataFromFlask)
            res.json(dataFromFlask);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get('/get-service', (req, res) => {

    const { containerName, containerPort, endpoint, params } = req.query;

    axios.get(`http://${containerName}:${containerPort}/${endpoint}?${params}`)
        .then(response => {
            const dataFromFlask = response.data;
            console.log(dataFromFlask)
            res.json(dataFromFlask);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});