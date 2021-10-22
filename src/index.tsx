import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Tag, Tasks, WitObject} from "./lib/types"
import * as mappers from "./lib/data_mappers"
// import {Tags} from "./lib/types/tags";
// import {Tasks} from "./lib/types/tasks";
// import {TagMapper} from "./lib/data_mappers/tag-mapper"
import {Individual} from "./components/individual";
import {TaskBlock} from "./components/task-block";
// import { DynamoInteractor } from "./lib/dynamo-interactor";
import { A, B } from "./lib/deleteme"
import {DynamoInteractor} from "./lib/dynamo-interactor";
import {TileList} from "./components/tile-list";
import {DescribeComponent} from "./components/describe-component";

/*** CSS ***/
import "./styles.css"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const tag = new Tag("bob");
// tag.id = 'bob';
let task = Tasks.create({
    id: WitObject.generateId(),
    name: 'A',
    description: 'B!'
}).then((task: Tasks)=>{
    Tasks.get(task.data.id).then((task: Tasks)=> {
        // console.log(task.data.name)
    })
});

// task.create().then((task: Tasks) => {
//     console.log("Done waiting after task.create call")
//     // ReactDOM.render(
//     //     <TaskBlock data={task.data}/>,
//     //     document.getElementById('root')
//     // )
//     console.log("After the render call for task block")
// });

// console.log("Here is the Task before insert: ", task)
// task.create().then((createTask: Tasks)=>{
//     console.log("Here is the Task after insert: ", task)
//     console.log("Now if we want the full data we have to call the whole thing")
//     Tasks.get(task.data.id).then((task: Tasks)=>{
//         console.log("Here is the actual task object after insert, then get: ", task)
//     });
// });

// let scanUpdate =  Tasks.scan().then((data: Tasks[])=>{
//     return data
// })

Tasks.scan().then((data: Tasks[])=>{
    console.log('Where is the scan data?', data)
    ReactDOM.render(
        <div>
        <DescribeComponent message={"Is this a describe component?"}/>
        <TileList data={data} refreshFunction={Tasks.scan}/>
        </div>,
        document.getElementById('root')
    )
    // TODO Task setup here
});

// Tasks.get(task.data.id).then((task: Tasks)=> {
//         // console.log(task.data.name)
//     }
// )

/// Left off here, can succesfully make calls to tasks, need to start on UI pieces for adding a task
// Need to add a delete task option
// Need to create other classes (yikes, how can I make task-mapper and by extension others, simpler?)



// Tasks.get(task.data.id)

// task.id = 'bob';
// tag.greet();
// task.greet();
// DynamoInteractor.getInstance().InsertTask()
//
// const a = new A();
// const b = new B();
//
// a.get();
// b.get();
// mappers.TagMapper.get(tag);
// mappers.TaskMapper.get(task);

// mappers.TagMapper().save();

// const dynamo = DynamoInteractor.getInstance()
// dynamo.InsertTask()

// Using the below does not work
// const primaryBanner = document.getElementsByClassName('App-header')[0]

// /** Testing Element Insertion : https://reactjs.org/docs/rendering-elements.html */
// const h1Element = <h1>Hello, H1Element!</h1>;
// ReactDOM.render(h1Element, document.getElementById('root'));
//
// /** Testing Component Insertion : https://reactjs.org/docs/components-and-props.html */
// const individualElement = <Individual name='Bobert'/>;
// ReactDOM.render(individualElement, document.getElementById('root'));
// // ReactDOM.render(individualElement, document.getElementsByClassName('App-header')[0]);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
