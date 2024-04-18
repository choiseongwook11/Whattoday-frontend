const express = require("express");
const cors = require('cors')
const app = express();
const port = 80;

app.use(cors());

app.get("/api", (req, res) => {
  return res.json({message: "this is from backend"});
})

app.listen(port, () => {
  console.log("server on")
})