import React  from 'react';
import {Button, Grid} from 'semantic-ui-react'
import FlipMove from 'react-flip-move';

import './TodoItems.css';


const TodoItems = (props) => {


return (
    
        <Grid textAlign="center">
            <ul className="centered">
                <FlipMove duration={800} easing="ease-out">
                    {props.entries && props.entries.map((item , index) => {
                        return (<div className="so" key={index}>
                        <li>
                            {item.taskText}
                        </li>
                        <Button className="btn-left" color="green" inverted onClick={()=>props.edit(index)}>edit</Button>
                        <Button className="btn-left" color="red" inverted  onClick={()=>props.delete(index)} >Done</Button>
                    </div>)
                    })}
                </FlipMove>
            </ul>

        </Grid>

    
    );
}


export default TodoItems; 