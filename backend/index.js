import express from "express"
const app = express()

app.listen(8080, ()=>{
    console.log("Connected to backend (Express)")
})

app.get("/", (req, res)=>{
    res.json("Home page")
})
