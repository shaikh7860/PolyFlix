import React from 'react';
import ReactDOM from 'react-dom';
import MyApp from './MyApp';
import './index.css';
import { BrowserRouter } from 'react-router-dom'



// ReactDOM.render(<MyApp />, document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <MyApp />
    </BrowserRouter>
)
