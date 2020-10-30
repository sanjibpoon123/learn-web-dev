# Automate and Organize Tests

## Introduction

Testing is an essential part of development. When used properly, testing can catch and identify issues with your implementation code before you deploy it to users. Instead of testing every function manually, developers automate their tests with a _test framework_.

Developers use test frameworks to organize and automate tests that provide useful feedback when errors occur. In this lesson we will use the [Mocha test framework](https://mochajs.org/) to write tests against JavaScript methods.

In this lesson you will:

*   Learn to write a basic Mocha test suite
*   Use Node’s `assert.ok` method to verify the expected output of your code
*   Understand and apply the four phases of a test to create an expressive testing suite
*   Evaluate the quality of your tests against the [characteristics of a good test](https://www.codecademy.com/articles/tdd-u2-good-test)

&nbsp;

## Install Mocha I

Before writing any tests you’ll need to use [Node.js and npm](https://www.codecademy.com/articles/what-is-node) to set up a JavaScript project and install Mocha.

*   _Node_ allows you to run JavaScript in the terminal
*   _npm_ is a Node tool that allows you to download packages from the web, and manage them in a JavaScript project
*   _Mocha_ is one of those packages and is used to test other JavaScript code

A JavaScript project is a directory of files. The following command creates a file **package.json** that can be used to manage packages for the project.

```


$ npm init


```

After running this command you will be prompted to enter information about your project. It’s okay to skip some fields if you’re not ready to enter that information.

With your project setup, you can install packages.

```


$ npm install mocha -D


```

Here’s what this command means:

*   `npm install` tells npm to install a package from the internet and any other packages it depends on
*   `mocha` is the package you want to download
*   `-D` notes that this package is a dependency for your project, which makes it easier for other developers to use

Once you `npm install` packages, you can find the packages and all their dependencies in the **node_modules** folder. The new directory structure contains the following:

```


project
|_ node_modules
|___ .bin
|___ mocha
|___ ...
|_ package.json


```

The `...` in the file structure represents other packages that are a dependency for Mocha.

&nbsp;

## Install Mocha II

After installing Mocha as a dependency we can run it in two ways.

The first (and more tedious) method is to call it directly from **node_modules**:

```


$ ./node_modules/mocha/bin/mocha


```

The second (and recommended) method is to add a script to **package.json**. In the `scripts` object in **package.json**, set the value of `"test"` to `mocha`. It should look like this:

```


"scripts": {
  "test": "mocha"
}


```

Now you can call Mocha with the following command:

```


$ npm test


```

Instead of manually running each test in the **test** directory, you can use this command to run the full test suite automatically.

&nbsp;

## describe and it blocks

In Mocha we group tests using the `describe` function and define tests using the `it` function. These two functions can be used to make your test suite _complete_, _maintainable_, and _expressive_ in the following ways:

*   Structure your test suite: you can organize tests into nested groups that reflect the structure of your implementation code.
    
*   Provide informative messages: you can define your tests using human-readable strings.
    

If you are testing a `Math` object with the method `.max`, you could use the following test code.

```javascript


describe('Math', () => {
  describe('.max', () => {
    it('returns the argument with the highest value', () => {
      // Your test goes here
    });
    it('returns -Infinity when no arguments are provided', () => {
      // Your test goes here
    });
  });
});


```

Both the `describe` and `it` functions accept two parameters: a descriptive string and a callback function. Though the functions are flexible, they are commonly used in the structure above: nest `describe` blocks to resemble the structure of your implementation code and write individual tests in `it` blocks. This makes your test suite _isolated_, _maintainable_, and _expressive_.

&nbsp;

## assert

In the last exercise, you learned how to organize and automate tests using the Mocha test framework. To write the tests themselves, we can use the `assert.ok` method provided by Node.js.

In programming, a test compares an expected outcome to an actual outcome. For example, we expect the outcome of the following code…

```js


const a = 1 + 2;


```

…to be: `a` has a value of `3`. To test the value saved to `a` with plain JavaScript, you would need to write a conditional statement comparing `a` to the expected result. Inside the statement, you would construct an error when the actual outcome does not match the expected.

`assert.ok()` allows you to compare values and throw errors as needed using one function call. The small, human-readable format of the functions will help you make a more _expressive_ test suite.

As a Node module, `assert` can be imported at the top of your files with

```js


const assert = require('assert');


```

You call `assert` functions like this:

```js


assert.ok(a === 3);


```

In this case `a === 3` evaluates to `true`, so no error is thrown.

If an argument passed to `assert.ok()` evaluates to false, an `AssertionError` is thrown. The error communicates to Mocha that a test has failed, and Mocha logs the error message to the console.

&nbsp;

## Setup, Exercise, and Verify

In this exercise you will be separating a test into _setup_, _exercise_, and _verify_ phases. This distinct and well-defined separation of steps makes your test more _reliable_, _maintainable_, and _expressive_.

The phases are defined as follows:

*   _Setup_ \- create objects, variables, and set conditions that your test depends on
    
*   _Exercise_ \- execute the functionality you are testing
    
*   _Verify_ \- check your expectations against the result of the exercise phase. You can use the `assert` library here
    

Clearly separating each phase makes a test easier to read, change, and validate.

&nbsp;

## Teardown

Some tests require a fourth phase called _teardown_. This step makes your test _isolated_.

*   _Teardown_ \- reset any conditions that were changed during the test

A test, like the example in this exercise, can make changes to its environment that could affect other tests. The teardown phase is used to reset the environment before the next test runs.

Some common changes to an environment include

*   altering files and directory structure
*   changing read and write permissions on a file
*   editing records in a database

In some cases — including the previous exercise — the _teardown_ phase isn’t needed because there are no conditions to reset.
Automate and Organize Tests

&nbsp;

## Hooks

Using teardown in the `it` block made your test _isolated_, but not _reliable_.

If the system encounters an error before it reaches the teardown, it will not execute that phase. In the previous example, an error may occur after the file is created but before it is deleted. The file would persist and may cause false negatives in future test runs.

Mocha provides _hooks_ to solve that problem.

A hook is a piece of code that is executed when a certain event happens. Hooks can be used to set and reset conditions like the setup and teardown phases do. In Mocha, a hook is written within a `describe` block.

```js
describe('example', () => {
  afterEach(() => {
    // teardown goes here
  });
  it('.sample', () => {
    // test goes here
  });
});
```

In this example the function passed to `afterEach` is called after each `it` block is executed.

The other hooks in the Mocha library are `before()`, `beforeEach()`, and `after()`. You can read more about them on the [Mocha website](https://mochajs.org/#hooks).
Automate and Organize Tests

&nbsp;

## Review

You can now write tests with Mocha and Node’s `assert.ok()` ! In this lesson you learned to:

*   Install Mocha with npm
*   Organize tests with `describe()` and `it()`
*   Ensure your tests are isolated and expressive with the four phases of a test
*   Ensure your tests are reliable with hooks
*   Write assertions with `assert.ok()`

As you continue to write tests, remember to always evaluate them against [the characteristics of a good test](https://www.codecademy.com/articles/tdd-u2-good-test): fast, complete, reliable, isolated, maintainable, and expressive. If you are meeting these six criteria, you are creating high quality test frameworks!
