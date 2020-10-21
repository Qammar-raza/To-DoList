const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
    taskText : {
        type : String,
        minlength : 1,
        required : true
    }
})

module.exports = mongoose.model("Task" , tasksSchema);