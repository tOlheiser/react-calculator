# Calculator Built with React

After reading through the documentation, I have chosen to build a calculator as my first React project. 

## What I'm unsure of:
I'm not sure if it is necessary to split this app into smaller components. As far as I can tell, I have my display, numbers, operators, and function buttons. That being said, if I'm to do this in a single component, I'd imagine my code would get messy. 

## State Object
```javascript
state = {
    firstValue: '',
    operator: '',
    secondValue: '',
    display: ''
    // Maybe: waitingForOperator: true
}
```

## Issue Log

### Log 1: Buttons and click events.
I'm not sure if I need to create components for my buttons. Also, I have several click events - for numbers, operators, and other buttons. I'll have to devise a way to keep my code brief - for example: every click event for numbers takes in a number parameter. 

```javascript
function handleClick (val) {
    const value = val;
}
```

### Mapping out what buttons do:
* **C** - This clears out ALL the values in the state object, including the operator. 
* **CE** - Erases the current value, reducing it to 0. Check to see if there is an operator assigned. If true, 2nd value = 0, if false, 1st value = 0. 
* **DEL** - Removes the last entered digit. Must first check to see if an operator is assigned. If true, modify the 2nd value, if false, modify the 1st value. Must also check to see whether value.length > 1 OR value === "0". 
* **+/-** - Checks to see if a number is > 0, if so, put a negative '-' sign in front of the number. Removes the '-' sign if the number is < 0. Must first check to see if an operator is assigned to determine which value to modify. 
* **=** - Resolves the equation. Must first check to see if an operator has been assigned, and that both values... contain values. Then perhaps run a switch statement, and if the operator mathes the value, execute the expression then store the value. 
* **.** - Adds a decimal to the number. There cannot be more than one decimal in a number. Must first check to see whether an operator is assigned to determine which value to modify. 
* +, -, *, / - Assigns an operator. If the second value already exists, perform the equation. The result of this equation is stored into value1 and the newly selected operator is assigned (which leaves the second value as null). Consider storing the switch statement in a separate function that returns a value. 
* **number keys** - Checks to see whether an operator is assigned to see which value to modify. Will not accept a '0' if the number currently has no value.  

**Deeper Logic**
