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
I'm not sure if I need to create components for my buttons. Also, I have several click events - for numbers, operators, and other buttons. I'll have to devise a way to keep my code brief - for example: it would be ideal that every click event for numbers takes in a number parameter. 

```javascript
function handleClick (val) {
    const value = val;
}
```

### Log 2: Mapping out what buttons do:
* **C** - This clears out ALL the values in the state object, including the operator. 
* **CE** - Erases the current value, reducing it to 0. Check to see if there is an operator assigned. If true, 2nd value = 0, if false, 1st value = 0. 
* **DEL** - Removes the last entered digit. Must first check to see if an operator is assigned. If true, modify the 2nd value, if false, modify the 1st value. Must also check to see whether value.length > 1 OR value === "0". 
* **+/-** - Checks to see if a number is > 0, if so, put a negative '-' sign in front of the number. Removes the '-' sign if the number is < 0. Must first check to see if an operator is assigned to determine which value to modify. 
* **=** - Resolves the equation. Must first check to see if an operator has been assigned, and that both values... contain values. Then perhaps run a switch statement, and if the operator matches the value, execute the expression then store the value. 
* **.** - Adds a decimal to the number. There cannot be more than one decimal in a number. Must first check to see whether an operator is assigned to determine which value to modify. 
* +, -, *, / - Assigns an operator. If the second value already exists, perform the equation. The result of this equation is stored into value1 and the newly selected operator is assigned (which leaves the second value as null). Consider storing the switch statement in a separate function that returns a value. 
* **number keys** - Checks to see whether an operator is assigned to see which value to modify. Will not accept a '0' if the number currently has no value.  

### Deeper Logic, Quality of Life Improvements
* In reviewing the code above, I find that I am often checking to see if the operator is assigned, ***Mostly to determine what value I'm modifying.*** 
**Question**: What is a convenient way to track whether an operator is assigned? 

Would it be better to have a property in state that directly keeps the status of whether an operator is assigned? Perhaps I could just create a function that checks for this and returns a Boolean. *I could store the value of that function into a veriable in the Calculator component's scope, so that all the event handlers have access to it.*

* Store the switch statement that solves equations into a function that takes in an operator as an argument and returns the result of the equation. This will be used in my operator click events. 

* For brevity, see if you can use one click event for all your numbers, and one click event for all your operators. **I'd be tempted to group my 'CE', 'C', and 'DEL' into one click event as well.** They have similar functionality and can run off a switch statement. 

* Consider giving the number '0' a separate click event. On one hand, it doesn't seem great that you are checking to see if a number is '0' on every number click event. On the other hand, bipassing a quick "if value === '0'" statement doesn't seem like a big deal. 

### Log 3: Handling the Displays

**Main Display**
Order of events when using the windows calculator:
*Clicking on an operator first will assign the operator & also assign the first value as zero. **By defualt, make the first value 0.***
1. I enter in numbers, they are immediately displayed. 
2. When I click on an operator, nothing changes.
3. When I enter in numbers again, the new set of numbers is displayed. 
4. When there is already an operator and 2nd value assigned, clicking on an operator will display the result of the previous set of values using the previously assigned operator. 
5. Clicking on the equals sign will display the result of the equation. By default, this is assigned as the first value. However, if the user begins entering a new number, that new number is assigned as the first value. ***This is a little tricky.***

Consider storing the result of the last equation into state. If this contains a value and I click on an operator, that result will be set as the first value. If I instead enter a new number while an operator is unassigned, it clears out the result of the last equation and sets that new number as the first value. 

**Long Display**

This doesn't seem too difficult, just concatenate all the numbers entered, make sure I don't enter more than one operator (1 +* 2), and clear it when necessary. 

### Log 4: Stumbled on event handlers.
In playing around with things and testing, I created an event handler the alerts '3' when the '3' button is clicked. However, my app wouldn't load.

```javascript
<button class="col num" onClick={this.handleClick(3)}>3</button>
```

My thinking was, 'I need to pass 3 in as a parameter. But I know I'm supposed to reference a function and not call it. What do I do? 

Turns out I can create an anonymous function that serves as a reference to the event handler. If you pass a function, it will call it when handling the event, if you pass the result of a function, the result should be a function

```javascript
<button class="col num" onClick={() => this.handleClick(3)}>3</button>
```

### Log 5: The console is useful, who would of thought!
To troubleshoot my code, I've been using the lazy and time consuming method of using the alert function to display state values on render. 

I was having issues figuring out why my code was throwing an error. I was stuck on it for a good 30 minutes. When I ran tests with the console window open, I was able to pick up on one of my state values being a number type and not a string like I was coding for. 

*As a side note, get in the habit of commenting code as you do it. If you leave it for later, you may not get to it until you have a lot of code to comment.*

### Log 6: Commenting and Git workflow
I fell into the bad habit of not commenting my code right away, and it's something that, if left unattended to, would not get finished for a while. This is not something I'd like to continue to do, as it made working on old code a little more tedious. Also, I found that my Git workflow is horrendous:

* I don't commit often enough; I often commit big batches of code at a time with no real 'theme' to it. 
* Branches are not something I thought I would need for a small project, but they would have been pretty helpful. 

### Log 7: Learning why React is great
So far I haven't made full use of what React has to offer, but already I can tell developing with it is nice. With the React developer tools, you get to see what exactly is in your state at all times. Also, I'd imagine that test driven development would be very easy with React. 