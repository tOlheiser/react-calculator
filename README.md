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