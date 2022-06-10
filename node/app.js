const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let spendingItems = [];

app.get("/spendings", (req, res) => {
  res.send(spendingItems);
});

app.post("/spendings", (req,res) => {
  
  const item = {
    description: req.body.description, //string
    amount: req.body.amount, //number
    spent_at: new Date().toISOString(), //date
    currency: req.body.currency //string
  }
  spendingItems.push(item);

  // res.status(200).send(`The Item saved successfully!`);
  res.status(200).send(JSON.stringify('Siker'));
});

app.listen(5000, () => console.log(`App is running`));

module.exports = app;
