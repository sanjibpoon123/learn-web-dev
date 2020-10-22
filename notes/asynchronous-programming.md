# Asynchronous Programming

Arbitrary Note:
&nbsp;

While sometimes used interchangeably, programming and coding actually have different definitions.

* *Programming* is the mental process of thinking up instructions to give to a machine (like a computer).
* *Coding* is the process of transforming those ideas into a written language that a computer can understand.

-------------------------------------

**An *asynchronous operation* is one that allows the computer to “move on” to other tasks while waiting for the asynchronous operation to complete. *Asynchronous programming* means that time-consuming operations don’t have to bring everything else in our programs to a halt.**

There are countless examples of asynchronicity in our everyday lives. Cleaning our house, for example, involves asynchronous operations such as a dishwasher washing our dishes or a washing machine washing our clothes. While we wait on the completion of those operations, we’re free to do other chores.

Similarly, web development makes use of asynchronous operations. Operations like making a network request or querying a database can be time-consuming, but JavaScript allows us to execute other tasks while awaiting their completion.

&nbsp;
&nbsp;

## 1. JavaScript Promises

### What is a Promise?

**Promises are objects that represent the eventual outcome of an asynchronous operation**. A `Promise` object can be in one of three states:

* **Pending**: The initial state— the operation has not completed yet.

* **Fulfilled**: The operation has completed successfully and the promise now has a resolved value. For example, a request’s promise might resolve with a JSON object as its value.

* **Rejected**: The operation has failed and the promise has a reason for the failure. This reason is usually an `Error` of some kind.

**We refer to a promise as *settled* if it is no longer pending— it is either fulfilled or rejected**. Let’s think of a dishwasher as having the states of a promise:

* **Pending**: The dishwasher is running but has not completed the washing cycle.

* **Fulfilled**: The dishwasher has completed the washing cycle and is full of clean dishes.

* **Rejected**: The dishwasher encountered a problem (it didn’t receive soap!) and returns unclean dishes.

If our dishwashing promise is fulfilled, we’ll be able to perform related tasks, such as unloading the clean dishes from the dishwasher. If it’s rejected, we can take alternate steps, such as running it again with soap or washing the dishes by hand.

*All promises eventually settle, enabling us to write logic for what to do if the promise fulfills or if it rejects.*

&nbsp;
&nbsp;

### Constructing a Promise Object

Let’s construct a promise! To create a new `Promise` object, we use the `new` keyword and the `Promise` constructor method:

```javascript
const executorFunction = (resolve, reject) => { };
const myFirstPromise = new Promise(executorFunction);
```

**The `Promise` constructor method takes a function parameter called the *executor function* which runs automatically when the constructor is called. The executor function generally starts an asynchronous operation and dictates how the promise should be settled.**

The *executor function* has two function parameters, usually referred to as the `resolve()` and `reject()` functions. The `resolve()` and `reject()` functions aren’t defined by the programmer. When the Promise constructor runs, JavaScript will pass its own `resolve()` and `reject()` functions into the executor function.

* `resolve` is a function with one argument. Under the hood, if invoked, `resolve()` will change the promise’s status from `pending` to `fulfilled`, and the promise’s resolved value will be set to the argument passed into `resolve()`.

* `reject` is a function that takes a reason or error as an argument. Under the hood, if invoked, `reject()` will change the promise’s status from `pending` to `rejected`, and the promise’s rejection reason will be set to the argument passed into `reject()`.

Let’s look at an example executor function in a `Promise` constructor:

```javascript
const executorFunction = (resolve, reject) => {
  if (someCondition) {
      resolve('I resolved!');
  } else {
      reject('I rejected!'); 
  }
}
const myFirstPromise = new Promise(executorFunction);
```

Let’s break down what’s happening above:

* We declare a variable `myFirstPromise`
* `myFirstPromise` is constructed using `new Promise()` which is the `Promise` constructor method.
* `executorFunction()` is passed to the constructor and has two functions as parameters: `resolve` and `reject`.
* If `someCondition` evaluates to `true`, we invoke `resolve()` with the string `'I resolved!'`
* If not, we invoke `reject()` with the string `'I rejected!'`

In our example, `myFirstPromise` resolves or rejects based on a simple condition, but, *in practice, promises settle based on the results of asynchronous operations*. For example, a database request may fulfill with the data from a query or reject with an error thrown. In this exercise, we’ll construct promises which resolve synchronously to more easily understand how they work.

&nbsp;
&nbsp;

### The Node setTimeout() Function

Knowing how to construct a promise is useful, but most of the time, knowing how to consume, or use, promises will be key. Rather than constructing promises, you’ll be handling `Promise` objects returned to you as the result of an asynchronous operation. These promises will start off pending but settle eventually.

Moving forward, we’ll be **simulating** this by providing you with functions that return promises which settle after some time. To accomplish this, we’ll be using `setTimeout()`. `setTimeout()` is a Node API (a comparable API is provided by web browsers) that uses callback functions to schedule tasks to be performed after a delay. `setTimeout()` has two parameters: a callback function and a delay in milliseconds.

```javascript
const delayedHello = () => {
  console.log('Hi! This is an asynchronous greeting!');
};

setTimeout(delayedHello, 2000);
```

Here, we invoke `setTimeout()` with the callback function `delayedHello()` and `2000`. In at least two seconds `delayedHello()` will be invoked. But why is it “at least” two seconds and not exactly two seconds?

This delay is performed asynchronously—the rest of our program won’t stop executing during the delay. Asynchronous JavaScript uses something called the event-loop. After two seconds, `delayedHello()` is added to a line of code waiting to be run. Before it can run, any synchronous code from the program will run. Next, any code in front of it in the line will run. This means it might be more than two seconds before `delayedHello()` is actually executed.

Let’s look at how we’ll be using `setTimeout()` to construct asynchronous promises:

```javascript
const returnPromiseFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(( ) => {resolve('I resolved!')}, 1000);
  });
};

const prom = returnPromiseFunction();
```

In the example code, we invoked `returnPromiseFunction()` which returned a promise. We assigned that promise to the variable `prom`. Similar to the asynchronous promises you may encounter in production, `prom` will initially have a status of pending.

&nbsp;
&nbsp;

### Consuming Promises

The initial state of an asynchronous promise is `pending`, but we have a guarantee that it will settle. How do we tell the computer what should happen then? Promise objects come with an aptly named `.then()` method. It allows us to say, “I have a promise, when it settles, **then** here’s what I want to happen…”

In the case of our dishwasher promise, the dishwasher will run **then**:

* If our promise `rejects`, this means we have dirty dishes, and we’ll add soap and run the dishwasher again.

* If our promise `fulfills`, this means we have clean dishes, and we’ll put the dishes away.

`.then()` is a higher-order function— it takes two callback functions as arguments. We refer to these callbacks as **handlers**. When the promise settles, the appropriate handler will be invoked with that settled value.

* The first handler, sometimes called `onFulfilled`, is a *success handler*, and it should contain the logic for the promise resolving.

* The second handler, sometimes called `onRejected`, is a *failure handler*, and it should contain the logic for the promise rejecting.

We can invoke `.then()` with one, both, or neither handler! This allows for flexibility, but it can also make for tricky debugging. If the appropriate handler is not provided, instead of throwing an error, **.`then()` will just return a promise with the same settled value as the promise it was called on**. *One important feature of `.then()` is that it always returns a promise*.

&nbsp;
&nbsp;

### The onFulfilled and onRejected Functions

To handle a “successful” promise, or a promise that resolved, we invoke `.then()` on the promise, passing in a success handler callback function:

```javascript
const prom = new Promise((resolve, reject) => {
  resolve('Yay!');
});

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

prom.then(handleSuccess); // Prints: 'Yay!'
```

With typical promise consumption, we won’t know whether a promise will resolve or reject, so we’ll need to provide the logic for either case. We can pass both an `onFulfilled` and `onRejected` callback to `.then()`.

```javascript
let prom = new Promise((resolve, reject) => {
  let num = Math.random();
  if (num < .5 ){
    resolve('Yay!');
  } else {
    reject('Ohhh noooo!');
  }
});

const handleSuccess = (resolvedValue) => {
  console.log(resolvedValue);
};

const handleFailure = (rejectionReason) => {
  console.log(rejectionReason);
};

prom.then(handleSuccess, handleFailure);
```

Let’s break down what’s happening in the example code:

* `prom` is a promise which will randomly either resolve with `'Yay!'` or reject with `'Ohhh noooo!'`.
* We pass two handler functions to `.then()`. The first will be invoked with `'Yay!'` if the promise resolves, and the second will be invoked with `'Ohhh noooo!'` if the promise rejects.

&nbsp;
&nbsp;

### Using catch() with Promises

One way to write cleaner code is to follow a principle called *separation of concerns*. **Separation of concerns means organizing code into distinct sections each handling a specific task.** It enables us to quickly navigate our code and know where to look if something isn’t working.

**Remember, `.then()` will return a promise with the same settled value as the promise it was called on if no appropriate handler was provided**. *This implementation allows us to separate our resolved logic from our rejected logic*. Instead of passing both handlers into one `.then()`, we can chain a second `.then()` with a failure handler to a first `.then()` with a success handler and both cases will be handled.

```javascript
prom
  .then((resolvedValue) => {
    console.log(resolvedValue);
  })
  .then(null, (rejectionReason) => {
    console.log(rejectionReason);
  });
```

Since JavaScript doesn’t mind whitespace, we follow *a common convention of putting each part of this chain on a new line to make it easier to read*. To create even more readable code, we can use a different promise function: .`catch()`.

The `.catch()` function takes only one argument, `onRejected`. In the case of a rejected promise, this failure handler will be invoked with the reason for rejection. Using `.catch()` accomplishes the same thing as using a `.then()` with only a failure handler.

Let’s look at an example using `.catch()`:

```javascript
prom
  .then((resolvedValue) => {
    console.log(resolvedValue);
  })
  .catch((rejectionReason) => {
    console.log(rejectionReason);
  });
```

Let’s break down what’s happening in the example code:

* `prom` is a promise which randomly either resolves with 'Yay!' or rejects with `'Ohhh noooo`!'.

* We pass a success handler to `.then`() and a failure handler to `.catch`().

* If the promise resolves, `.then()`‘s success handler will be invoked with `'Yay!`'.

* **If the promise rejects,`.then(`) will return a promise with the same rejection reason as the original promise and `.catch()`‘s failure handler will be invoked with that rejection reason.**

&nbsp;
&nbsp;

### Chaining Multiple Promises

One common pattern we’ll see with asynchronous programming is multiple operations which depend on each other to execute or that must be executed in a certain order. We might make one request to a database and use the data returned to us to make another request and so on! Let’s illustrate this with another cleaning example, washing clothes:

We take our dirty clothes and put them in the washing machine. If the clothes are cleaned, **then** we’ll want to put them in the dryer. After the dryer runs, if the clothes are dry, **then** we can fold them and put them away.

**This process of chaining promises together is called composition**. Promises are designed with composition in mind! Here’s a simple promise chain in code:

```javascript
firstPromiseFunction()
.then((firstResolveVal) => {
  return secondPromiseFunction(firstResolveVal);
})
.then((secondResolveVal) => {
  console.log(secondResolveVal);
});
```

Let’s break down what’s happening in the example:

* We invoke a function `firstPromiseFunction()` which returns a promise.

* We invoke `.then()` with an anonymous function as the success handler.

* Inside the success handler we return a new promise— the result of invoking a second function, `secondPromiseFunction()` with the first promise’s resolved value.

* We invoke a second `.then()` to handle the logic for the second promise settling.

* Inside that `.then()`, we have a success handler which will log the second promise’s resolved value to the console.

In order for our chain to work properly, we had to return the promise `secondPromiseFunction(firstResolveVal)`. **This ensured that the return value of the first `.then()` was our second promise rather than the default return of a new promise with the same settled value as the initial**.

&nbsp;
&nbsp;

### Avoiding Commmon Mistakes

1. Nesting promises instead of chaining them.

2. Forgetting to `return` a promise.

```javascript
returnsFirstPromise()
.then((firstResolveVal) => {
  returnsSecondValue(firstResolveVal)
})
.then((someVal) => {
  console.log(someVal);
})
```

* We invoke a second `.then()`. **It’s supposed to handle the logic for the second promise**, but since we didn’t return, this `.then()` is invoked on a promise with the same settled value as the original promise!

&nbsp;
&nbsp;

### Using Promise.all()

When done correctly, promise composition is a great way to handle situations where asynchronous operations depend on each other or execution order matters. *What if we’re dealing with multiple promises, but we don’t care about the order?* Let’s think in terms of cleaning again.

For us to consider our house clean, we need our clothes to dry, our trash bins emptied, and the dishwasher to run. We need **all** of these tasks to complete but not in any particular order. Furthermore, since they’re all getting done asynchronously, they should really all be happening at the same time!

To maximize efficiency we should use concurrency, multiple asynchronous operations happening together. With promises, we can do this with the function `Promise.all()`.

`Promise.all()` accepts an **array of promises** as its argument and returns a single promise. That single promise will settle in one of two ways:

* If every promise in the argument array resolves, the single promise returned from `Promise.all()` will resolve with an array containing the resolve value from each promise in the argument array.

* If any promise from the argument array rejects, the single promise returned from `Promise.all()` will immediately reject with the reason that promise rejected. This behavior is sometimes referred to as **failing fast**.

Let’s look at a code example:

```javascript
let myPromises = Promise.all([returnsPromOne(), returnsPromTwo(), returnsPromThree()]);

myPromises
  .then((arrayOfValues) => {
    console.log(arrayOfValues);
  })
  .catch((rejectionReason) => {
    console.log(rejectionReason);
  });
```

&nbsp;
&nbsp;

### Review


* Promises are JavaScript objects that represent the eventual result of an asynchronous operation.

* Promises can be in one of three states: pending, resolved, or rejected.

* A promise is settled if it is either resolved or rejected.

* We construct a promise by using the `new` keyword and passing an executor function to the `Promise` constructor method.

* `setTimeout()` is a Node function which delays the execution of a callback function using the event-loop.

* We use `.then()` with a success handler callback containing the logic for what should happen if a promise resolves.

* We use `.catch()` with a failure handler callback containing the logic for what should happen if a promise rejects.

* Promise composition enables us to write complex, asynchronous code that’s still readable. We do this by chaining multiple `.then()`‘s and `.catch()`‘s.

* **To use promise composition correctly, we have to remember to return promises constructed within a `.then()`**.

* We should chain multiple promises rather than nesting them.

* To take advantage of concurrency, we can use `Promise.all()`.

--------------------------------------;

## Async Await

&nbsp;

### The async Keyword

The `async` keyword is used to write functions that handle asynchronous actions. We wrap our asynchronous logic inside a function prepended with the `async` keyword. Then, we invoke that function.

```javascript
async function myFunc() {
  // Function body here
};

myFunc();
```

We’ll be using async function declarations throughout this lesson, but we can also create async function expressions:

```javascript
const myFunc = async () => {
  // Function body here
};

myFunc();
```

`async` **functions always return a promise**. This means we can use traditional promise syntax, like .then() and .catch with our async functions. An async function will return in one of three ways:

* If there’s nothing returned from the function, it will return a promise with a resolved value of `undefined`.

* If there’s a non-promise value returned from the function, it will return a promise resolved to that value.

* If a promise is returned from the function, it will simply return that promise.

```javascript
async function fivePromise() { 
  return 5;
}

fivePromise()
.then(resolvedValue => {
    console.log(resolvedValue);
  })  // Prints 5
```

In the example above, *even though we return 5* inside the function body, what’s actually returned when we invoke `fivePromise()` is a *promise with a resolved value of 5*.

&nbsp;
&nbsp;

### The await Operator

In the last exercise, we covered the `async` keyword. By itself, it doesn’t do much; `async` functions are almost always used with the additional keyword `await` inside the function body.

The `await` keyword can only be used inside an `async` function. await is an operator: it returns the resolved value of a promise. Since promises resolve in an indeterminate amount of time, `await` halts, or pauses, the execution of our `async` function until a given promise is resolved.

In most situations, we’re dealing with promises that were returned from functions. Generally, these functions are through a library, and, in this lesson, we’ll be providing them. We can `await` the resolution of the promise it returns inside an async function. In the example below, `myPromise()` is a function that returns a promise which will resolve to the string `"I am resolved now!"`.

```javascript
async function asyncFuncExample(){
  let resolvedValue = await myPromise();
  console.log(resolvedValue);
}

asyncFuncExample(); // Prints: I am resolved now!
```

Within our `async` function, `asyncFuncExample()`, we use await to halt our execution until `myPromise()` is resolved and assign its resolved value to the variable resolvedValue. Then we log `resolvedValue` to the console. We’re able to handle the logic for a promise in a way that reads like synchronous code.

&nbsp;
&nbsp;

### Handling Dependent Promises

The true beauty of `async...await` is when we have a series of asynchronous actions which depend on one another. For example, we may make a network request based on a query to a database. In that case, we would need to wait to make the network request until we had the results from the database. With native promise syntax, we use a chain of `.then()` functions making sure to return correctly each one:

```javascript
function nativePromiseVersion() {
    returnsFirstPromise()
    .then((firstValue) => {
        console.log(firstValue);
        return returnsSecondPromise(firstValue);
    })
   .then((secondValue) => {
        console.log(secondValue);
    });
}
```

Here’s how we’d write an async function to accomplish the same thing:

```javascript
async function asyncAwaitVersion() {
 let firstValue = await returnsFirstPromise();
 console.log(firstValue);
 let secondValue = await returnsSecondPromise(firstValue);
 console.log(secondValue);
}
```

Though using the `async...await` syntax can save us some typing, the length reduction isn’t the main point. Given the two versions of the function, the `async...await` version more closely resembles synchronous code, which helps developers maintain and debug their code. The `async...await` syntax also makes it easy to store and refer to resolved values from promises further back in our chain which is a much more difficult task with native promise syntax.

&nbsp;
&nbsp;

### Handling Errors

When `.catch()` is used with a long promise chain, there is no indication of where in the chain the error was thrown. This can make debugging challenging.

With `async...await`, we use `try...catch` statements for error handling. By using this syntax, not only are we able to handle errors in the same way we do with synchronous code, but we can also catch both synchronous and asynchronous errors. This makes for easier debugging!

```javascript
async function usingTryCatch() {
 try {
   let resolveValue = await asyncFunction('thing that will fail');
   let secondValue = await secondAsyncFunction(resolveValue);
 } catch (err) {
   // Catches any errors in the try block
   console.log(err);
 }
}

usingTryCatch();
```

Remember, since `async` functions return promises we can still use native promise’s `.catch()` with an `async` function

```javascript
async function usingPromiseCatch() {
   let resolveValue = await asyncFunction('thing that will fail');
}

let rejectedPromise = usingPromiseCatch();
rejectedPromise.catch((rejectValue) => {
console.log(rejectValue);
})
```

*This is sometimes used in the global scope to catch final errors in complex code.*

&nbsp;
&nbsp;

### Handling Independent Promises

Remember that `await` halts the execution of our `async` function. This allows us to conveniently write synchronous-style code to handle dependent promises. But what if our `async` function contains multiple promises which are not dependent on the results of one another to execute?

```javascript
async function waiting() {
 const firstValue = await firstAsyncThing();
 const secondValue = await secondAsyncThing();
 console.log(firstValue, secondValue);
}

async function concurrent() {
 const firstPromise = firstAsyncThing();
 const secondPromise = secondAsyncThing();
console.log(await firstPromise, await secondPromise);
}
```

With our `concurrent()` function both promises’ asynchronous operations can be run simultaneously. If possible, we want to get started on each asynchronous operation as soon as possible! Within our `async` functions we should still take advantage of *concurrency*, the ability to perform asynchronous actions at the same time.

**Note**: if we have multiple truly independent promises that we would like to execute fully in parallel, we must use individual `.then()` functions and avoid halting our execution with `await`.

&nbsp;

### Await Promise.all()

Another way to take advantage of concurrency when we have multiple promises which can be executed simultaneously is to `await` a `Promise.all()`.

We can pass an array of promises as the argument to `Promise.all()`, and it will return a single promise. This promise will resolve when all of the promises in the argument array have resolved. This promise’s resolve value will be an array containing the resolved values of each promise from the argument array.

```javascript
async function asyncPromAll() {
  const resultArray = await Promise.all([asyncTask1(), asyncTask2(), asyncTask3(), asyncTask4()]);
  for (let i = 0; i<resultArray.length; i++){
    console.log(resultArray[i]); 
  }
}
```

`Promise.all()` allows us to take advantage of asynchronicity— each of the four asynchronous tasks can process concurrently. `Promise.all()` also has the benefit of **failing fast**, meaning it won’t wait for the rest of the asynchronous actions to complete once any one has rejected. As soon as the first promise in the array rejects, the promise returned from `Promise.all()` will reject with that reason. As it was when working with native promises, `Promise.all()` is a good choice if multiple asynchronous tasks are all required, but none must wait for any other before executing.
