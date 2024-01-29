const express = require('express')
const app = express();
app.use(express.json())
const cors = require('cors');
const db = require("./models");

const Student = require("./routes/students")
const Teacher = require("./routes/teachers")
const Auth = require("./routes/authstudent")
const authTeacher = require("./routes/authteacher")
// app.listen(3000, ()=>{
//     console.log("Server running")
// })
app.use(express.json())

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin","http://localhost:4200/")
//     res.header("Access-Control-Allow-Origin","*")
//     res.header("Access-Control-Allow-Methods","Get, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
//     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })

db.sequelize.sync({
  // force: true
})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors())

app.use("/students",Student)
app.use("/teachers",Teacher)
app.use("/auth",Auth)
app.use("/authTeacher",authTeacher)

app.listen(3000, ()=> console.log("Server running"))