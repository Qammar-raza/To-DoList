const express = require('express');
const taskController = require('../Controller/Todo');
const router = express.Router();


router.get('/getTasks' , taskController.getTasks);
router.post("/add" , taskController.AddTasks);
router.put("/edit/:taskId" , taskController.editTask);
router.delete("/delete/:taskId" , taskController.deleteTasks);


  
module.exports = router;