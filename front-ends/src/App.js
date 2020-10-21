import React, { Fragment,useState ,useEffect } from "react";
import { Form, Icon, Grid ,Button } from "semantic-ui-react";
import TodoItems from './TodoItems/TodoItems';
import "./App.css";


function App() {
  const [items , setItems] = useState([]);
  const [val , setVal] = useState('');
  const [editMode ,setEditMode ] = useState(false);
  const [editTaskId ,setEditId] = useState('');
  useEffect(()=>{
    loadTasks();
  } ,[items])

  const loadTasks = () => {
    fetch('/tasks/getTasks' ,{method : 'GET' , headers : {
      'Content-Type': 'application/json'
    }}).then(res => {
      return res.json()
    }).then(resData => {
      let newItems = [...items];
      newItems =  resData.tasks.map(t => t);
      setItems(newItems);
    })
  }

  const inputChangeHandler = (e) => {
    setVal(e.target.value);
  }

  const createTask = (e) => {
    e.preventDefault();
    if(val !== ""){
      if(editMode == false){
        fetch('/tasks/add' ,  {method : 'POST' ,headers : {
          'Content-Type': 'application/json'
        }, body : JSON.stringify({
          text : val
        })}).then(res => {
          return res.json();
        }).then(resData => {
            const newItem ={
              taskText : resData.task.taskText,
              key : resData.task._id
            }
            let updatedItems = [...items];
            updatedItems.push(newItem);
            setItems(updatedItems);
            setVal("");
        }).catch(err=>{
          console.log(err)
        })
      }
      
    }
  }

  const deleteItem = (taskindex) =>{
    let taskId = items[taskindex]._id;
    fetch("/tasks/delete/" + taskId ,
      {
        method : 'DELETE' 
      }).then(res => {

        return res.json()
      }).then(result => {
        const index = items.findIndex(task => task._id === taskId);
        const newItems = [...items];
        const updatedItems = newItems.filter(item => item._id !== taskId);
        setItems(updatedItems);
      })
  }

  const editItem = (taskindex) => {
    setEditMode(true);
    let taskId = items[taskindex]._id ;
    setEditId(taskId);
    let taskText = items[taskindex].taskText;
    setVal(taskText);
  }

  const sendEditTask = () =>{
    fetch("/tasks/edit/" + editTaskId, 
      {
        method : 'PUT',
        body : JSON.stringify({text : val}),
        headers : {'Content-Type': 'application/json'}
      }
    ).then(res => {
      return res.json()
    }).then(resData => {
      setEditMode(false);
      setVal("")
    }).catch(err=>{
      console.log(err);
    })
  }


  return (
    <Fragment>   
      <nav>
        <div className="logo">
          <h2 className="so">TodoList </h2>
        </div>
      </nav>
      <div className="bf">
        <Grid textAlign="center" >
          <Grid.Column className="grid-width" >
            <Form onSubmit={createTask} className="form"  size="large">
              <Form.Input name="task" value={val}  placeholder="Add Task" onChange={(e)=>inputChangeHandler(e)} required/>
              <Button color="green" inverted onClick={createTask}>
                <Icon name="checkmark"/>Add Task
              </Button>
                {
                  editMode ? 
                    <Button color="blue" inverted onClick={sendEditTask}>
                      <Icon name="checkmark"/>Edit Task   
                    </Button> : null }
            </Form>
          </Grid.Column>
        </Grid>
        <TodoItems entries={items} delete={deleteItem} edit={editItem}/>
      </div>
    </Fragment>
  );
}

export default App;
