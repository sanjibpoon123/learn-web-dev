# JavaScript Fundamentals

## Higher-Order Functions

### Functions as Data

JavaScript functions behave like any other data type in the language; we can assign functions to variables, and we can reassign them to new variables.

In JavaScript, functions are first class objects. This means that, like other objects, JavaScript functions can have properties and methods.

Since functions are a type of object, they have properties such as `.length` and `.name` and methods such as `.toString()`. You can see more about the methods and properties of functions in the [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function).

*Functions are special because we can invoke them, but we can still treat them like any other type of data*.

&nbsp;

### Functions as Parameters

Since functions can behave like any other type of data in JavaScript, it might not surprise you to learn that we can also pass functions (into other functions) as parameters. **A higher-order function is a function that either accepts functions as parameters, returns a function, or both**! We call the functions that get *passed in as parameters an invoked callback functions* because they get called during the execution of the higher-order function.

**When we pass a function in as an argument to another function, we don’t invoke it**. Invoking the function would evaluate to the return value of that function call. With callbacks, we pass in the function itself by typing the function name without the parentheses (that would evaluate to the result of calling the function):

```javascript
const timeFuncRuntime = funcParameter => {
   let t1 = Date.now();
   funcParameter();
   let t2 = Date.now();
   return t2 - t1;
}

const addOneToOne = () => 1 + 1;

timeFuncRuntime(addOneToOne);
```

We wrote a higher-order function, `timeFuncRuntime()`. It takes in a function as an argument, saves a starting time, invokes the *callback function*, records the time after the function was called, and returns the time the function took to run by subtracting the starting time from the ending time.

This higher-order function could be used with any callback function which makes it a potentially powerful piece of code.

We then invoked `timeFuncRuntime()` first with the `addOneToOne()` function - **note how we passed in `addOneToOne` and did not invoke it.**

```javascript
timeFuncRuntime(() => {
  for (let i = 10; i>0; i--){
    console.log(i);
  }
});
```

In this example, we invoked `timeFuncRuntime()` with an anonymous function that counts backwards from 10. Anonymous functions can be arguments too!

&nbsp;
&nbsp;

## Arrays

Arrays are JavaScript’s way of making lists. Arrays can store any data types (including strings, numbers, and booleans). Like lists, arrays are ordered, meaning each item has a numbered position.

### Common Array Methods

Use (https://devdocs.io/) to fully understand.

Properties/Methods | Descriptions
--------------------|---------------------
`Array.length`   |   sets or returns the number of items in the array.
`Array.pop()` |   removes the last element from an array and returns that element. This method changes the length of the array.
`Array.push()`    |   adds one or more elements to the end of an array and returns the new length of the array.
`Array.map()`   |   creates a new array with the results of calling a provided function on every element in the calling array.
`Array.filter()`    |   creates a new array with all elements that pass the test implemented by the provided function.
`Array.reduce()`    |   executes a reducer function (that you provide) on each member of the array resulting in a single output value.
`Array.shift()`     |   removes the first element from an array and returns that removed element. This method changes the length of the array.
`Array.unshif()`    |   adds one or more elements to the beginning of an array and returns the new length of the array.
`Array.join()`      |   creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.
`Array.slice()`     |   returns a *shallow copy* of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
`Array.splice()`    |   changes the contents of an array by removing existing elements and/or adding new elements.
`Array.findIndex()`     |   returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating no element passed the test.
`Array.indexOf()`   |   returns the first index at which a given element can be found in the array, or -1 if it is not present.
&nbsp;

Sidenote:
&nbsp;

`string.split()` = splits a String object into an array of strings by separating the string into substrings, using a specified separator string to determine where to make each split.

&nbsp;
&nbsp;
