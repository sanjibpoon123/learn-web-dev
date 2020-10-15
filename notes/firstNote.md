# return

When a *return* statement is used in a function body, the execution of the function
is stopped and the code that follows it will not be executed.

## Helper function

A helper function is a function that performs part of the computation of another function. Helper functions are used to make programs easier to read by giving *descriptive names to computations*. They also let you resule computations, just as with functions in general.

## Function expressions

Unlike function declarations, function expressions are not hoisted so they
cannote be called before they are defined.

## Arrow Functions

ES6 introduced *arrow function syntax*, a shorter way to write functions by using the special *fat arrow* `() =>` notation.

```javascript
const rectangleArea = (width * height) => width * height;
```

## Consise Body Arrow Functions

1. Functions that take only a single parameter do not need that parameter to be
enclosed in paranteses. However, if a function takes zero or multiple parameters,
parantheses are required.
    * Zero parameters / Multiple parameters

        ```javascript
        const foo = () => console.log("I am foo whoo!');
        const rectangleParameter = (length, breadth) => {
             return 2 (length * breadth);
             };
        ```

2. A function body composed of a single-line block does not need curly braces.
Without the curly braces, whatever that line evalutes will be automatically returned.
The contents of the block should immediately follow the arrow `=>` and the `return` keyword can be removed. **This is referred to as implicit return.**

    * One Parameter & Single-Line Block

        ```javascript
        const squareParameter = length => 4 * length;
        ```

## Asynchronous Operation

An *asynchronous operation* is one that allows the computer to *"move on"* to other
tasks while waiting for the asynchronous operation to complete.
Asynchronous programming means that time-consuming operations don't have to bring
everything in our program to a halt.

## Promise

*Promises are objects that represent the eventual outcome of an asynchronous operation.*

The `Promise` constructor method takes a function parameter called the *executor function* which runs automatically when the constructor is called.
The *executor function* generally starts an asynchronous operation and dictates how
the promise should be settled.

The executor function has two function parameters, usually referred to
as the resolve() and reject() functions.

* `resolve` is a function with one argument. Under the hood, if
invoked, will change the promise's status from `pending` to `fulfilled`, and the *promise's resolved value will be set to the argument passed into `resolve()`*.

* `reject` is a function that takes a reason or error as an argument.
Under the hood, if invoked, `reject()` will change the promise's status
from `pending` to `rejected`, and the *promise's rejection reason will
be set to the argument passed into `reject()`*.

## XHR GET Request

`Asynchronous JavaScript and XML (AJAX)`, enables request to be made
after the initial page load. Initially, AJAX was used only for XML formatted data, now it can be used to make requests that have many different formats.
Similarly, the `XMLHttpRequest (XHR) API`, named for XML, can be used to make many kinds of requests and supports other forms of data.
