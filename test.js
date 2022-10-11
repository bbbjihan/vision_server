const express = require("express");
const app = express();
const port = 8080;

app.listen(port,() =>{
    console.log("run complete.");
});

app.get("/",(req,res)=>{
    res.send("run complete.!!");
});