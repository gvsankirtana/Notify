const conenectToMongo = require("./db");
conenectToMongo();
const express = require("express");
const app = express();
const port = 3000;
//Available routes
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/auth',require('./routes/notes'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
