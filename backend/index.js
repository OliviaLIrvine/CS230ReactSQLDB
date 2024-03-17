import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"1.0"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/book", (req,res)=>{
    const q = "SELECT * FROM book"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/book", (req,res)=>{
    const q = "INSERT INTO book (`title`,`desc`,`price`, `cover`) VALUE(?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created sucessfully");
    })
})

app.delete("/book/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM book WHERE id = ?"

    db.query(q, [bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted sucessfully");
    })
})

app.put("/book/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE book SET `title` = ?, `desc`= ?, `price`=?, `cover`=?, WHERE id =?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,

    ]

    db.query(q, [...values,bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated sucessfully");
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})