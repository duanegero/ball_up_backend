require("dotenv").config();
const express = require("express"); //importing exprees
const cors = require("cors"); //importing cors
const app = express(); //setting variable to handle express

const PORT = process.env.PORT || 3005;

app.use(express.json()); //middleware to parse and handle json
app.use(cors()); //enable cors for all routes

app.get("/", (req, res) => {
  res.send("Ball Up API");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
