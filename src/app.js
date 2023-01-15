const express = require("express");
const app = express();
require("./db/conn");

//const MensRanking = require("../src/models/mens");
const router = require("../src/routers/men");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`connection is live at at port no ${port}`);
})