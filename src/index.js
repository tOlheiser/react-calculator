import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Testing things out, playing around.

function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Tanner" />

ReactDOM.render(
    element,
    document.getElementById('root')
);