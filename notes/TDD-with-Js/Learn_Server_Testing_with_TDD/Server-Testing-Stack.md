# Server Testing Stack

## Introduction

When testing an application, feature tests expose required tests or implementations at different levels of the application technology stack. One of those levels is the backend server.

Server tests are used to test the server response only, not any front-end rendering of code or user interactions. We “disconnect” the browser and interact directly with the server using requests. The tests define the expected behavior of the interactions and check the actual responses against what we expect.

Server tests are commonly used to test API responses, but we also use server tests for any server response that our application relies on. This can include checking status codes and error messages.

In this lesson, we introduce a suite of technologies and concepts for performing testing on a JavaScript-based server. These include Chai, jsdom, and SuperTest. We also review how to use async/await for asynchronous calls. When adapting this to your project, it needs to be tailored to match the specific technology stack for your project.

&nbsp;

## Testing Framework: Chai

When writing tests, sometimes you’ll find that the tests require calculation steps or inline code to determine if the test is passing. For example, to test if an array `foo` includes an element `bar` using Mocha with the built-in Node assertion library, we use the JavaScript `includes` helper:

```js
assert.ok(foo.includes(bar));

```

To improve the readability and flow of our tests, we extend the built-in Node assertion library with Chai.

```js

const {assert} = require('chai');

```

The main function in Chai we are using is `.include()`. This allows us to rewrite the previous example as:

```js
assert.include(foo, bar);

```

Include also works to check that text contains certain values:

```js
assert.include('foobar', 'bar'); // Evaluates to true

```

The large set of assertion methods in the chai library enable us to write more expressive tests that are easy for developers to understand.

&nbsp;

## Testing HTML Responses

Our back-end server is serving dynamic HTML to the user. For the homepage, this is located in the **jsdom-test.js** file to the right. It is possible to use `.include()` to verify that the HTML response contains certain Strings, but gets cumbersome to verify the hierarchical relationships of DOM elements.

We can use the jsdom library to improve this type of assertion. It allows us to select elements of the DOM and check relationships and content. To increase the readability of our tests, we abstracted the jsdom functionality into a custom function, `parseTextFromHTML`:

```js
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};
```

This function takes the HTML response as a string and the desired selector as inputs and returns the `textContent` of the corresponding element. If no element is found, it will return a TypeError.

&nbsp;

## Async / Await

A server typically handles many requests at a time, but may be only capable of processing a subset of the requests concurrently. One side effect of this is that the server response time is neither instant nor predictable. If no other processes are occurring on the server, requests are handled quickly, but if the server is close to full capacity, the request can take a few seconds or even timeout.

We need a way to receive asynchronous responses from the server and then act on them. The async/await pattern introduced in Node 8 helps us write readable descriptions of the behavior of our application which is an important part of writing good tests.

To use this pattern, define the function with the `async` keyword. Then, within the function, use the `await` keyword in front of the asynchronous function you are calling. For example:

```js
const foo = async () => {
  console.log(await someAsyncThing());
  return true;
}
foo();
```

Here, we are waiting for `someAsyncThing()` to return before logging the result to the console.

&nbsp;

## SuperTest

As you may have noticed in the previous exercise, we are using the function `request` to make server calls to support our tests. This is actually a reference to the SuperTest library:

```js
const request = require('supertest');

```

This library was specifically designed for testing Node server responses and integrates well with Mocha and Chai. To use SuperTest, we pass the `app` object from our app into the `request` function. To make a GET request, we use `.get()` with the desired route as the argument:

```js
await request(app)
          .get('/')
          .send();

```

It is also possible to perform a POST using SuperTest. We chain any desired properties or inputs to the HTTP call, and use `.send()` to make the request:

```js
await request(app)
          .post('/messages')
          .type('form')
          .send({author, message});
```

--------------------

Summary

In this lesson we covered a set of technologies used for testing a Node server. These included:

*   _Chai_ \- a library for extending the built in Node assertion library
*   _jsdom_ \- a library for interacting and testing the DOM returned by the server (this functionality is encapsulated in our `parseTextFromHTML` helper function).
*   _async / await_ \- a pattern for making asynchronous code more readable
*   _SuperTest_ \- a library for making Node server requests and testing their responses
