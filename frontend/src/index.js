

import React from 'react'
import ReactDOM from 'react-dom'
import MyApp from './MyApp'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

/*
//If you have React v17:
ReactDOM.render(
    <BrowserRouter>
        <MyApp />
    </BrowserRouter>, 
    document.getElementById('root'))
*/

// With React v18:
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <MyApp />
    </BrowserRouter>
)