const csv = require("csv-parser");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(cors());

let inventory = [];

fs.createReadStream("./sample-data-v2.csv")
  .pipe(csv())
  .on("data", (row) => {
    inventory.push(row);
  });

app.get("/api/inventory", (req, res) => {
  res.json({
    data: inventory,
  });
});

app.listen(port, () => {
  console.log("Server is Running");
});
