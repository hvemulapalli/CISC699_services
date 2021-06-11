const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors')
const config        = require('./config.json');
const app           = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.json({message: "Welcome to Agile Project Management Portfolio"})
});

require("./src/routes/routes.js")(app);

const port = config.server_port;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});