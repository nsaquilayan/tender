const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const port = 3001;

app.use(cors());

app.get("/", (req, res) => {
    let longitude = req.query.longitude;
    let latitude = req.query.latitude;
    //axios.get("https://api.yelp.com/v3/businesses/search\n");
    res.status(200).send("ok");
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})