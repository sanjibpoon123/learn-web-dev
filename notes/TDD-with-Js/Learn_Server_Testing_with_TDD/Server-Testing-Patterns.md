# Server Testing Patterns

## Introduction

In general, it is up to the developer to make a judgement call on how in depth to write a test. Every test written adds time to the testing cycle and can require maintenance if changes are made to the server behavior. For example, extensively testing failure cases at the feature level might be more than is needed if the error behavior can be fully tested and described at the server level.

As you develop an application, you may realize that you can replace feature tests or reduce them with equal coverage at a lower level. One question to ask when deciding between a full feature test versus a server test is:

“Is it worth trading a slow feature test for a faster server test that doesn’t test the UI?”

Based on the context of the different levels of testing, you should aim to pick the set of tests that gives you the best combination of reliable, complete and fast tests.

In this lesson, you will use server-level testing technologies to test-drive the development of an Express server.

Server tests often provide feedback in terms of HTTP domain concepts, like status codes, header keys and values, and the content of the response body. Let’s take a look at a feature-level test and compare it to a corresponding server test in **messages-test.js** to the right:

```js
describe('posting a message', () => {
    it('saves the message with the author information', () => {
     const author = 'user name';
     const message ='feature testing with TDD makes me feel empowered to create a better workflow';
      browser.url('/');
      browser.setValue('input[id=author]', author);
      browser.setValue('textarea[id=message]', message);
      browser.click('input[type=submit]');
      assert.include(messagesText(), message);
      assert.include(messagesText(), author);
    });
    });
  });
```

When such a test fails due to a non-existent server implementation, the developer needs to dive into the server level and begin the TDD process to drive the server solution.

&nbsp;

## Status Codes

Server tests are slightly faster than browser-driven feature tests. Since the web browser is cut out of the test, we are not testing how things are rendered for the user. Instead, we are focused on the server response.

One use of TDD at the server level is to ensure that the HTTP status codes are returned as expected. Verifying status codes provide the most basic level of confidence that the server is functioning correctly. Having a test suite that includes status codes provides a quick check when implementing a new feature that we haven’t accidentally caused a request for valid routes to respond not authorized (401) or not found (404). (Full list of status codes at [httpstatuses.com](https://httpstatuses.com/))

To verify status codes, we are asserting that the response status is equal to the status code integer that our application requires:

```js
assert.equal(response.status, 200);
```

If we use the “red, green, refactor” approach to implement our server behavior we would start out with an assertion like this and expect it to fail (“red”). We then implement the behavior to pass the test (“green”) and continue to refactor if needed, ensuring the test remains passing.

&nbsp;

## Response Content

In the previous exercise, we checked that the server responded with specific status codes. Now we need to make sure the server is responding with the correct content. Specifically, we are looking at HTML responses that are rendered by the front-end.

Many servers return dynamic HTML content based on the user, the URL accessed, header values, and more. We use TDD to ensure the server responds correctly for each case. When designing our tests, it is important to consider both the intended and unintended user behavior.

We can organize our tests into two categories:

*   tests that exercise the “Happy Path” — expected use cases of our application
*   tests that exercise the “Sad Path” — unexpected or invalid use of our application

For our tests, once we retrieve the response from the server, we use `assert.include()` from the Chai library to check the response.

As an example, after requesting a valid profile page for “My Name”, you may receive the following response content:

```js
response.text = '<div><div id="my-name">My Name</div></div>';
```

You can retrieve the content of `#my-name` and check it using the following:

```js
assert.include(parseTextFromHTML(response.text, '#my-name'), "My Name"); //True
```

We could also write a separate test to check the corresponding “sad path”. Perhaps there is not yet a page for “Your Name”, so you should not receive a response containing similar HTML. We use `.notInclude()` to verify that the response is **not** including “Your Name” :

```js
assert.notInclude(parseTextFromHTML(response.text, '#my-name'), "Your Name"); //True
```

Note that here we are identifying the HTML elements by their ID using our `parseTextFromHTML()` helper but you can use any selectors supported by the jsdom library. This helper is returning the text content of the corresponding HTML element only, but you could write a separate helper for accessing other attributes.

&nbsp;

## Refactoring: Route Parameters

In the previous exercise, we checked that the server responded with a specific message. On our home page, the title is constant for everyone, “Messaging App”.

What if we want to create a profile page that is customized for each user?

A straightforward implementation would be to generate hard coded routes for every single user of our app. Think: `'welcome/alice' => '<h1>Your Name is alice</h1>'`, `'welcome/bob' => '<h1>Your Name is bob</h1>'`, etc.

Hopefully if you see repetitive code like this, you’ll have an urge to refactor it to something more elegant using a variable route parameter. This allows us to put any username into the url and have the server generate the appropriate response. Think: `'welcome/:username' => '<h1>Your Name is ' + req.params.username +'</h1>'`.

If you are using the red, green, refactor approach, you will start with a set of passing (“green”) assertions for the section of code you are looking to improve. With the current behavior captured, you can begin refactoring, knowing that your tests will “catch” you by turning red if you miss something in your approach.

&nbsp;

## Refactoring: Handlebars

Sometimes during the reflection of the refactor phase, you will realize that you can implement something better or more efficiently. In the code so far, we have been responding with inline HTML strings. On a large project, this could make it difficult for the front end developer to organize and maintain.

An improved approach to this is using a templating library like Handlebars to separate the HTML view from the JavaScript controller.

In the web app that you’ve built in this lesson, we’ve placed the templates in the `/views` folder and have an extension of `.handlebars`. Our controller will now use `render` to create the view and pass in any variables:

```js
const param = 'Foo';
res.render('templateName', {param});
```

The templates are written like regular HTML, but variables can be accessed within the view using double curly braces:

```js
<h1>{{ param }}</h1>
```

When the view is rendered, it will replace `{{ param }}` with its actual value:

```html
<h1>Foo</h1>
```

&nbsp;

## API Errors

As mentioned earlier, one of the use cases for server testing is for checking API responses, especially the “sad path” where a user interacts with the server in an unexpected or disallowed manner. We need to make sure our server properly handles invalid passwords, form field errors, etc.

Ensuring the app is designed to withstand these issues and that the error interactions are well bounded is important.

Keep in mind that while there may only be one “happy path” for an interaction (user submits a valid password), there can be many corresponding “sad paths” (password is too short, doesn’t contain special characters, etc). By testing the majority of these on the server level, it saves us from testing them at a more resource intensive level including the user view.
Server Testing Patterns

------------------

## Summary

We used several technologies to write tests for both “happy” and “sad” paths of:

*   Server status codes
*   Server response content
*   Error cases

We also saw how TDD can be used at the server level to guide the implementation of the server code:

*   We wrote a failing test
*   We wrote the minimal required server code to pass the test
*   When we decided or needed to refactor to meet external requirements, we used the existing tests to make sure our refactored code maintained the same end behavior
