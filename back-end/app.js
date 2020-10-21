const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./Routes/Todo');
const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET ,POST ,PUT , PATCH ,DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-type  , Authorization"
    );
    next();
});

app.use('/tasks' , taskRoutes);
app.use((error , req ,res , next) =>{
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data; 
  res.status(status).json({
    message : message,
    data : data
  })
});

mongoose.connect('mongodb+srv://qammar:Samipower@cluster0.ulnck.mongodb.net/todo-list?retryWrites=true&w=majority').then(()=>{
    app.listen(8080);
    console.log('connected to the database');
}).catch(err => {
    console.log(err);
})



