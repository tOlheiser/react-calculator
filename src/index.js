import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { clearScreenDown } from 'readline';
import { throwStatement } from '@babel/types';


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
            secondValue: '',
            display: '0',
            resultReceived: false
        };
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.handleEqualsClick = this.handleEqualsClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleClearCurrentClick = this.handleClearCurrentClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDecimalClick = this.handleDecimalClick.bind(this);
        this.handlePosNegToggleClick = this.handlePosNegToggleClick.bind(this);
        // Bind event handlers here. 
    }
    
    /* returnCurrentValue() {
        if (this.state.operator === '' || this.state.resultReceived) {

        }
    } */

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
                } else if (this.state.resultReceived === true) {
                    this.setState({
                        firstValue: value,
                        display: value,
                        resultReceived: false
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
    }

    handleDecimalClick() {
        let firstValue = this.state.firstValue;
        let secondValue = this.state.secondValue;

        if (this.state.resultReceived) return;

        if (this.state.operator === '') {
            if (firstValue.includes('.')) return;
            this.setState({
                firstValue: firstValue += '.',
                display: firstValue
            });
        } else if (this.state.secondValue === '') {
            this.setState({
                secondValue: '0.',
                display: '0.'
            });
        } else {
            if (secondValue.includes('.')) return;
            this.setState({
                secondValue: secondValue += '.',
                display: secondValue
            });
        }
    }

    handlePosNegToggleClick() {
        let firstValue = this.state.firstValue;
        let secondValue = this.state.secondValue;
        //determine the current value
        if (this.state.operator === '') {
            if (this.state.resultReceived) {
               if (firstValue.includes('-')) {
                    firstValue = firstValue.substr(1);
                    this.setState({
                        firstValue: firstValue,
                        display: firstValue,
                        resultReceived: false
                    });
                } else {
                    firstValue = '-' + firstValue;
                    this.setState({
                        firstValue: firstValue,
                        display: firstValue,
                        resultReceived: false
                    });
                }
            }  else {
                if (firstValue.includes('-')) {
                    firstValue = firstValue.substr(1);
                    this.setState({
                        firstValue: firstValue,
                        display: firstValue
                    });
                } else {
                    firstValue = '-' + firstValue;
                    this.setState({
                        firstValue: firstValue,
                        display: firstValue
                    });
                }
            } 
        } else {
            if (secondValue.includes('-')) {
                secondValue = secondValue.substr(1);
                this.setState({
                    secondValue: secondValue,
                    display: secondValue
                });
            } else {
                secondValue = '-' + secondValue;
                this.setState({
                    secondValue: secondValue,
                    display: secondValue
                });
            }
        }
    }

    handleOperatorClick(operator) {
        if (this.state.secondValue === '') {
            this.setState({
                operator: operator
            });
        } else {
            this.calculate();
            this.setState ({
                operator: operator
            });
        }
    }

    handleEqualsClick() {
        if (this.state.secondValue === '' || this.state.operator === '') {
            return
        }
        this.calculate();
    }

    handleClearClick() {
        this.setState({
            firstValue: '0',
            operator: '',
            secondValue: '',
            display: '0',
            resultReceived: false
        });
    }

    handleClearCurrentClick() {
        (this.state.operator === '') ?
            this.setState({
                firstValue: '0',
                display: '0', 
                resultReceived: false
            }) :
            this.setState({
                secondValue: '',
                display: '0',
                resultReceived: false
            });
    }

    handleDeleteClick() {
        let value;

        if (this.state.resultReceived) return;

        if (this.state.operator === '') {
            // I don't want 
            if (this.state.firstValue === '0') {
                return
            } else if (this.state.firstValue.length == 1) {
                this.setState({
                    firstValue: '0',
                    display: '0'
                });
            } else {
                value = this.state.firstValue;
                this.setState({
                    firstValue: value.slice(0, -1),
                    display: value.slice(0, -1)
                });
            }
        } else {
            if (this.state.secondValue === '') {
                return
            } else if (this.state.secondValue.length == 1) {
                this.setState({
                    secondValue: '',
                    display: '0'
                });
            } else {
                value = this.state.secondValue;
                this.setState({
                    secondValue: value.slice(0, -1),
                    display: value.slice(0, -1) 
                });
            }
        }
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
            secondValue: '',
            display: result,
            resultReceived: true
        });
    }

    render() {

        let display = this.state.display;
        //alert(this.state.firstValue);
        //alert(this.state.operator);
        //alert(this.state.secondValue);
        //alert(this.state.display);


        return (
            <div class="container">
                <div class="row display">
                    <p>0</p>
                    <div class="row numContainer">
                        <h1>{display}</h1>
                    </div>
                </div>
                <div class="row"> 
                    <button class="col" onClick={this.handleClearCurrentClick}>CE</button>
                    <button class="col" onClick={this.handleClearClick}>C</button>
                    <button class="col" onClick={this.handleDeleteClick}>DEL</button>
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
                    <button class="col num lCorner" onClick={this.handlePosNegToggleClick}>~</button>                    
                    <button class="col num" onClick={() => this.handleNumberClick('0')}>0</button>
                    <button class="col num" onClick={this.handleDecimalClick}>.</button>
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