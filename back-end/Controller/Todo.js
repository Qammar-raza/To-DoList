const Task = require('../Models/Todo');

exports.getTasks = (req ,res ,next) => {
    Task.find().then(tasks => {
        res.status(200).json({
            message : "Found all the tasks",
            tasks :tasks
        })
    }).catch(err => {
        if(err.statuscode){
            err.statuscode = 500;
        }
        next(err);
    })
}

exports.AddTasks =(req ,res , next)=>{
    const textContent = req.body.text;
    const task = new Task({
        taskText : textContent
    }) ;
    task.save().then(result => {
        res.status(200).json({
            message : 'Task is successfully created',
            task : result
        })
    }).catch(err => {
        if(err.statuscode  ){
            err.statuscode = 500;
        }
        next(err);
    })
}
exports.editTask = (req,res,next) => {
    const taskId = req.params.taskId; 
    const textContent = req.body.text;
    Task
        .findById(taskId)
        .then(task=>{
            if(task){
                task.taskText = textContent;
            }
            return task.save();
    }).then(result => {
        console.log(result);
        res.status(200).json({message : 'editing done successfully' , task : result});
    }).catch(err => {
        if(err.statuscode  ){
            err.statuscode = 500;
        }
        next(err);
    })
} 


exports.deleteTasks = (req,res,next) => {
    const taskId = req.params.taskId;
    Task.findById(taskId).then(task => {
        if(!task){
            const error = new Error('Task with the given id was not found!');
            error.statuscode = 404;
            throw error;
        }
        return Task.findByIdAndRemove(taskId); 
    }).then(result => {
        res.status(200).json({message : 'POST deletion successfull !'})
    })
    .catch(err => {
        if(err.statuscode  ){
            err.statuscode = 500;
        }
        next(err);
    }) 

}