import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {PrimaryLayout} from "./components/primary-layout";


/*** CSS ***/
import "./styles.css"

/*** Entry point for the rest of the application ***/
ReactDOM.render(
    <PrimaryLayout />,
    document.getElementById('root')
)


reportWebVitals();
