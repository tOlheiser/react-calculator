import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { clearScreenDown } from 'readline';


/*
To Do:
 - To be decided: Add a <Button /> component. 
 - Add hover and click functions
*/

function Button(props) {
    return <button class={props.styles} onClick={props.click}>{props.value}</button>;
} 

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstValue: '0',
            operator: '',
            secondValue: '0',
            display: '0'
        };
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.handleEqualsClick = this.handleEqualsClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        // Bind event handlers here. 
    }

    handleNumberClick(value) {
        if (this.state.operator === '') {
            if (this.state.firstValue === '0' && value === '0') {
                return
            } else {
                if (this.state.firstValue === '0') {
                    this.setState({
                        firstValue: value, 
                        display: value
                    });
                } else {
                    this.setState({
                        firstValue: this.state.firstValue += value,
                        display: this.state.firstValue
                    });
                } 
            }
        } else {
            if (this.state.secondValue === '0' && value === '0') {
                return
            } else {
                if (this.state.secondValue === '0') {
                    this.setState({
                        secondValue: value, 
                        display: value
                    });
                } else {
                    this.setState({
                        secondValue: this.state.secondValue += value,
                        display: this.state.secondValue
                    });
                } 
            }
        }
        //alert (value);
        //alert (this.state.firstValue);
    }

    handleOperatorClick(operator) {


        if (this.state.secondValue === '0') {
            this.setState({
                operator: operator
            });
        } else {
            this.calculate();
        }
    }

    handleEqualsClick() {
        this.calculate();
    }

    handleClearClick() {
        this.setState({
            firstValue: '0',
            operator: '',
            secondValue: '0',
            display: '0'
        });
    }

    calculate() {
        let operator = this.state.operator;
        let firstVal = Number(this.state.firstValue);
        let secondVal = Number(this.state.secondValue);
        let result;

        // eslint-disable-next-line default-case
        switch (operator) {
            case '-':
                result = firstVal - secondVal;
                break;
            case '+':
                result = firstVal + secondVal;
                break;
            case '*':
                result = firstVal * secondVal;
                break;
            case '/':
                result = firstVal / secondVal;
                break;
        }

        this.setState({
            firstValue: result,
            operator: '',
            secondValue: '0',
            display: result
        });
    }

    render() {
        
        let display = this.state.display;
        //alert(this.state.firstValue);
        //alert (this.state.operator);
        return (
            <div class="container">
                <div class="row display">
                    <p>0</p>
                    <div class="row numContainer">
                        <h1>{display}</h1>
                    </div>
                </div>
                <div class="row"> 
                    <button class="col" >CE</button>
                    <button class="col" onClick={this.handleClearClick}>C</button>
                    <button class="col" >DEL</button>
                    <button class="col" onClick={() => this.handleOperatorClick('/')}>/</button>
                </div>
                <div class="row"> 
                    <button class="col num" onClick={() => this.handleNumberClick('7')}>7</button>
                    <button class="col num" onClick={() => this.handleNumberClick('8')}>8</button>
                    <button class="col num" onClick={() => this.handleNumberClick('9')}>9</button>
                    <button class="col" onClick={() => this.handleOperatorClick('*')}>X</button>
                </div>
                <div class="row"> 
                    <button class="col num" onClick={() => this.handleNumberClick('4')}>4</button>
                    <button class="col num" onClick={() => this.handleNumberClick('5')}>5</button>
                    <button class="col num" onClick={() => this.handleNumberClick('6')}>6</button>
                    <button class="col" onClick={() => this.handleOperatorClick('-')}>-</button>
                </div>
                <div class="row"> 
                    <button class="col num" onClick={() => this.handleNumberClick('1')}>1</button>
                    <button class="col num" onClick={() => this.handleNumberClick('2')}>2</button>
                    <button class="col num" onClick={() => this.handleNumberClick('3')}>3</button>
                   <button class="col" onClick={() => this.handleOperatorClick('+')}>+</button>
                </div>
                 <div class="row"> 
                    <button class="col num lCorner" >~</button>                    
                    <button class="col num" onClick={() => this.handleNumberClick('0')}>0</button>
                    <button class="col num" >.</button>
                    <button class="col rCorner" onClick={this.handleEqualsClick}>=</button>
                </div>
            </div>
            );
    }
} 

ReactDOM.render(
    <Calculator/>,
    document.getElementById('root')
);