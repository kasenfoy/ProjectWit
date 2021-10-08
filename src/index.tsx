import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Tag, Tasks } from "./lib/types"
import * as mappers from "./lib/data_mappers"
// import {Tags} from "./lib/types/tags";
// import {Tasks} from "./lib/types/tasks";
// import {TagMapper} from "./lib/data_mappers/tag-mapper"
import {Individual} from "./components/individual";
// import { DynamoInteractor } from "./lib/dynamo-interactor";
import { A, B } from "./lib/deleteme"
import {DynamoInteractor} from "./lib/dynamo-interactor";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


// const tag = new Tag("bob");
// tag.id = 'bob';
const task = new Tasks({
    id: "bobny",
    name: 'helloname',
    description: 'This is my first task!'
});

task.create().then(() => {console.log("Done waiting after task.create call")});
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

/** Testing Element Insertion : https://reactjs.org/docs/rendering-elements.html */
const h1Element = <h1>Hello, H1Element!</h1>;
ReactDOM.render(h1Element, document.getElementById('root'));

/** Testing Component Insertion : https://reactjs.org/docs/components-and-props.html */
const individualElement = <Individual name='Bobert'/>;
ReactDOM.render(individualElement, document.getElementById('root'));
// ReactDOM.render(individualElement, document.getElementsByClassName('App-header')[0]);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
