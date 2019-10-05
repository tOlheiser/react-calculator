# Refining My Repetitive Code

After getting my calculator working, I went through my code to see if I could improve it to be more concise. I found that in several functions, there was a lot of repetitive code. Here's an example:

```javascript
handleDecimalClick() {
        let firstValue = this.state.firstValue;
        let secondValue = this.state.secondValue;

        // If the display contains the value from the previous equation, reset the values.
        if (this.state.resultReceived) {
            this.setState({
                firstValue: '0.',
                display: '0.',
                resultReceived: 'false'
            });
        // If true, the current value is firstValue
        } else if (this.state.operator === '') {
            // There cannot be more than one decimal in a number.
            if (firstValue.includes('.')) return;
            // concatenating the decimal onto the value.
            this.setState({
                firstValue: firstValue += '.',
                display: firstValue
            });
        // Assigning '0.' if the secondValue is empty.
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
```

For starters, I had the secondValue default to an empty string. It wasn't until later that I determined that all I needed to determine the current value was whether or not the operator was assigned. This is the first thing I need to fix. Secondly, the code is repetitive. I'm doing the same thing twice for the first and second value. 

## Solution

I've decided that I could create a function that returns the current value. 

```javascript
returnCurrentValue() {
    let currentValue;
    this.state.operator === '' ? currentValue = 'firstValue' : currentValue = 'secondValue';
    return currentValue;
}
```

Then, when I go to set state:

```javascript
else if (this.state[currentValue].includes('.')) return;
this.setState({
    [currentValue]: value
})
```