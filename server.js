require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const port = 3001;

app.use(cors());

app.get("/", (req, res) => {
    if (!req.query.location && !req.query.latitude && !req.query.longitude) {
        res.status(400).send();
    } else {
        axios.get("https://api.yelp.com/v3/businesses/search", {
            headers: {
                Authorization: "Bearer " + process.env.YELP_FUSION_API_KEY
            },
            params: {
                location: req.query.location,
                latitude: req.query.latitude,
                longitude: req.query.longitude
            }
        }).then((data) => {
            res.status(200).send(data.data);
        }).catch((error) => {
            console.log('error: ', error)
        });
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})