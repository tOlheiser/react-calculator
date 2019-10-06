import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { clearScreenDown } from 'readline';
import { throwStatement } from '@babel/types';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstValue: '',
            operator: '',
            secondValue: '',
            display: '0',
            resultReceived: false
        };
        // Binding event handlers
        this.handleNumberClick = this.handleNumberClick.bind(this);
        this.handleOperatorClick = this.handleOperatorClick.bind(this);
        this.handleEqualsClick = this.handleEqualsClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
        this.handleClearCurrentClick = this.handleClearCurrentClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDecimalClick = this.handleDecimalClick.bind(this);
        this.handlePosNegToggleClick = this.handlePosNegToggleClick.bind(this);
    }

    handleNumberClick(value) {
        let currentValue = this.returnCurrentValue();

        if (this.invalidInput(value)) return;

        /* If the current value is '0', the number entered is not '0',
        or if resultReceived is true, assign that number as the value. */
        if (this.state[currentValue] === '0' || this.state.resultReceived === true) {
            this.setState({
                [currentValue]: value, 
                display: value,
                resultReceived: false
            });
        /* If the value is negative and begins with 0, assign the new number and strip the '0'. */
        } else if (this.state[currentValue] === '-0') {
            value = '-' + value;

            this.setState({
                [currentValue]: value,
                display: value
            });
        // Default behaviour: Concatenate the number onto the value.
        } else {
            let currentNumber = this.state[currentValue];
            this.setState({
                [currentValue]: currentNumber += value,
                display: currentNumber
            });
        } 
    }

    handleDecimalClick() {
        let currentValue = this.returnCurrentValue();
        let currentNumber = this.state[currentValue];

        // If the display contains the value from the previous equation, reset the values.
        if (this.state.resultReceived || this.state[currentValue] === '') {
            this.setState({
                [currentValue]: '0.',
                display: '0.',
                resultReceived: 'false'
        });
        // If true, the current value is firstValue
        } else {
            // There cannot be more than one decimal in a number.
            if (this.state[currentValue].includes('.')) return;
            // concatenating the decimal onto the value.
            this.setState({
                [currentValue]: currentNumber += '.',
                display: currentNumber
            });
        }
    }

    handlePosNegToggleClick() {
        let firstValue = this.state.firstValue;
        let secondValue = this.state.secondValue;
        //determine the current value
        if (this.state.operator === '') {
            if (this.state.resultReceived) {
                firstValue = firstValue.toString();
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
        } else if (this.state.operator.length === 1 && this.state.secondValue === '') {
            firstValue = firstValue.toString();
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
        } else if (this.state.resultReceived === 'true' && this.state.operator.length === 1) {
            firstValue = firstValue.toString();
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
        // calculates the first and second value before storing the operator.
        } else {
            this.calculate();
            this.setState ({
                operator: operator
            });
        }
    }

    handleEqualsClick() {
        if (this.state.secondValue === '' || this.state.operator === '') {
            return;
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
        let currentValue = this.returnCurrentValue();
        this.setState({
            [currentValue]: '0',
            display: '0', 
            resultReceived: false
        });
    }

    handleDeleteClick() {
        let currentValue = this.returnCurrentValue();
        let currentNumber;

        // Will not delete any digits from the previous result.
        if (this.state.resultReceived) return;

        // If the current value is '0', exit the function.
        if (this.state[currentValue] === '0' || this.state[currentValue] === '') {
            return;
        // if the current value consists of only 1 digit, reset the values.
        } else if (this.state[currentValue].length === 1) {
            this.setState({
                [currentValue]: '0',
                display: '0'
            });
        } else {
            currentNumber = this.state[currentValue];
            // Use the slice function to remove the last character.
            this.setState({
                [currentValue]: currentNumber.slice(0, -1),
                display: currentNumber.slice(0, -1)
            });
        } 
    } 

    invalidInput(input) {
        // Stripping the value of any decimal or commas and storing the length in a variable.
        let firstValueLength = this.state.firstValue.toString().replace(/^-|\./gu, '').length;
        let secondValueLength = this.state.secondValue.toString().replace(/^-|\./gu, '').length;

        /* Length must not be greater than 16, and will return if a '0' has been entered when the
        current value is equal to '0'. */
        if  ((firstValueLength > 15 || secondValueLength > 15) || 
            (this.state.firstValue === '0' && input === '0') || 
            (this.state.secondValue === '0' && input === '0')) {
                return true;
        } 
    }

    returnCurrentValue() {
        let currentValue;
        this.state.operator === '' ? currentValue = 'firstValue' : currentValue = 'secondValue';
        return currentValue;
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
        // Formats the display to include a commas.
        let display = Number(this.state.display).toLocaleString(undefined, {
            maximumFractionDigits: 15
        });
        
        /* formats the display to include a decimal if it's the last character 
        toLocaleString() removes it. */
        if (this.state.display[this.state.display.length -1] === '.') display += '.';
        
        // strips the display value of any hyphen or decimal values and stores the length.
        let displayLength = this.state.display.toString().replace(/^-|\./gu, '').length; 

        return (
            <div class="container">
                <div class="row display">
                    <h1 className={displayLength > 12 ? "xsmallSize" : displayLength > 9 ? "smallSize" : displayLength > 7 ? "regSize" : "largeSize"}>{display}</h1>
                </div>
                <div class="row"> 
                    <button class="col" onClick={this.handleClearCurrentClick}>CE</button>
                    <button class="col" onClick={this.handleClearClick}>C</button>
                    <button class="col" onClick={this.handleDeleteClick}>&#x232B;</button>
                    <button class="col" className={this.state.operator === "/" ? "activeOperator" : "col"} onClick={() => this.handleOperatorClick('/')}>&#247;</button>
                </div>
                <div class="row"> 
                    <button class="col num" onClick={() => this.handleNumberClick('7')}>7</button>
                    <button class="col num" onClick={() => this.handleNumberClick('8')}>8</button>
                    <button class="col num" onClick={() => this.handleNumberClick('9')}>9</button>
                    <button class="col" className={this.state.operator === "*" ? "activeOperator" : "col"} onClick={() => this.handleOperatorClick('*')}>&#215;</button>
                </div>
                <div class="row"> 
                    <button class="col num" onClick={() => this.handleNumberClick('4')}>4</button>
                    <button class="col num" onClick={() => this.handleNumberClick('5')}>5</button>
                    <button class="col num" onClick={() => this.handleNumberClick('6')}>6</button>
                    <button class="col" className={this.state.operator === "-" ? "activeOperator" : "col"} onClick={() => this.handleOperatorClick('-')}>&#8722;</button>
                </div>
                <div class="row"> 
                    <button class="col num" onClick={() => this.handleNumberClick('1')}>1</button>
                    <button class="col num" onClick={() => this.handleNumberClick('2')}>2</button>
                    <button class="col num" onClick={() => this.handleNumberClick('3')}>3</button>
                   <button class="col" className={this.state.operator === "+" ? "activeOperator" : "col"} onClick={() => this.handleOperatorClick('+')}>&#43;</button>
                </div>
                 <div class="row"> 
                    <button class="col num lCorner" onClick={this.handlePosNegToggleClick}>&#177;</button>                    
                    <button class="col num" onClick={() => this.handleNumberClick('0')}>0</button>
                    <button class="col num" onClick={this.handleDecimalClick}>.</button>
                    <button class="col rCorner" onClick={this.handleEqualsClick}>&#61;</button>
                </div>
            </div>
            );
    }
} 

ReactDOM.render(
    <Calculator/>,
    document.getElementById('root')
);