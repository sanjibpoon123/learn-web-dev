# Requests I

## Introduction to Requests

Have you ever wondered what happens after you click a “Submit” button on a web page? For instance, if you are submitting information, where does the information go? How is the information processed? The answer to the previous questions revolves around _HTTP requests_.

There are many types of HTTP requests. The four most commonly used types of HTTP requests are GET, POST, PUT, and DELETE. In this lesson, we’ll cover GET and POST requests. If you want to learn more about the different HTTP requests, we recommend the following documentation:

*   [Mozilla Developer Network: HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

With a GET request, we’re retrieving, or _getting_, information from some source (usually a website). For a POST request, we’re _posting_ information to a source that will process the information and send it back.

In this lesson, we will explain how to make GET and POST requests by using JavaScript’s **XHR** object. We’ll also incorporate query strings into our requests.

## HTTP Requests

One of JavaScript’s greatest assets is its non-blocking properties, or that it is an _asynchronous_ language.

Websites, like newspaper websites, take advantage of these non-blocking properties to provide a better user experience. Generally, a site’s code is written so that users don’t have to wait for a giant image to load before being allowed to read the actual article—rather, that text is rendered first and then the image can load in the background.

JavaScript uses an _event loop_ to handle asynchronous function calls. When a program is run, function calls are made and added to a stack. The functions that make requests that need to wait for servers to respond then get sent to a separate queue. Once the stack has cleared, then the functions in the queue are executed.

Web developers use the event loop to create a smoother browsing experience by deciding when to call functions and how to handle asynchronous events. We’ll be exploring one system of technologies called Asynchronous JavaScript and XML, or AJAX.

To read more about the event loop, read the MDN documentation:

*   [MDN Documentation: Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)

## XHR GET Requests I

Asynchronous JavaScript and XML (AJAX), enables requests to be made after the initial page load. Initially, AJAX was used only for XML formatted data, now it can be used to make requests that have many different formats.

[MDN Documentation: Extensible Markup Language (XML)](https://developer.mozilla.org/en-US/docs/XML_introduction).

Similarly, the XMLHttpRequest (XHR) API, named for XML, can be used to make many kinds of requests and supports other forms of data.

Remember, we use GET to retrieve data from a source. Take a look at the boilerplate code in the diagram to see how to make an XHR GET request.
*   [XHR GET diagram](https://content.codecademy.com/courses/intermediate-javascript-requests/diagrams/XHR%20GET%20diagram.svg)


## XHR GET Requests II

In the previous exercise, you made a GET request to the Datamuse API to find words that rhyme. In this exercise, we will create a request to set a topic and find adjectives that describe the input word using query strings.

A query string contains additional information to be sent with a request. The Datamuse API allows us to retrieve more specific data with query strings attached to the request URL.

*   [Wiki: query string](https://en.wikipedia.org/wiki/Query_string)

A query string is separated from the URL using a `?` character. After `?`, you can then create a parameter which is a key value pair joined by a `=`. Examine the example below:

```js
'https://api.datamuse.com/words?key=value'
```

If you want to add an additional parameter you will have to use the `&` character to separate your parameters. Like so:

```js
'https://api.datamuse.com/words?key=value&anotherKey=anotherValue'
```


## XHR POST Requests I

Reminder: If you haven’t already signed up for an API Key from Rebrandly, please read this Rebrandly sign up guide.

*   [Codecademy Articles: Rebrandly URL Shortener API](https://www.codecademy.com/articles/rebrandly-signup) .

Great! By this point, you’ve signed up for an API key and you know the essence of making a GET request.

The major difference between a GET request and POST request is that a POST request requires additional information to be sent through the request. This additional information is sent in the _body_ of the post request.

Review the code from the diagram to construct your own POST request in the next lesson.
*   [XHR POST diagram](https://content.codecademy.com/courses/intermediate-javascript-requests/diagrams/XHR%20POST%20diagram.svg)

---------------

## Review Requests I

You’ve done an amazing job navigating through making XHR GET and POST requests! Take some time to review the core concepts before moving on to the next lesson.

1.  JavaScript is the language of the web because of its asynchronous capabilities. AJAX, which stands for Asynchronous JavaScript and XML, is a set of tools that are used together to take advantage of JavaScript’s asynchronous capabilities.
    
2.  There are many HTTP request methods, two of which are GET and POST.
    
3.  GET requests only request information from other sources.
    
4.  POST methods can introduce new information to other sources in addition to requesting it.
    
5.  GET requests can be written using an XMLHttpRequest object and vanilla JavaScript.
    
6.  POST requests can also be written using an XMLHttpRequest object and vanilla JavaScript.
    
7.  Writing GET and POST requests with XHR objects and vanilla JavaScript requires constructing the XHR object using `new`, setting the `responseType`, creating a function that will handle the response object, and opening and sending the request.
    
8.  To add a query string to a URL endpoint you can use `?` and include a parameter.
    
9.  To provide additional parameters, use `&` and then include a key-value pair, joined by `=`.
    
10.  Determining how to correctly write the requests and how to properly implement them requires carefully reading the documentation of the API with which you’re working.

&nbsp;
&nbsp;

---------------------
# Requests II
## Introduction to Requests with ES6
In the previous lesson, we spent a lot of time dealing with asynchronous data (remember AJAX/ Asynchronous JavaScript And XML?). Many of our web page interactions rely on asynchronous events, so managing these events is essential to good web development.

To make asynchronous event handling easier, _promises_ were introduced in JavaScript in ES6:

*   [Mozilla Development Network: Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

A promise is an object that handles asynchronous data. A promise has three states:

*   _pending_ : when a promise is created or waiting for data.
*   _fulfilled_ : the asynchronous operation was handled successfully.
*   _rejected_ : the asynchronous operation was unsuccessful.

The great thing about promises is that once a promise is fulfilled or rejected, you can chain an additional method to the original promise.

In this lesson, we will explain how to use `fetch()`, which uses promises to handle requests. Then, we will simplify requests using `async` and `await`.

## fetch() GET Requests I

The first type of requests we’re going to tackle are GET requests using `fetch()`

*   [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

The `fetch()` function:

*   Creates a request object that contains relevant information that an API needs.
*   Sends that request object to the API endpoint provided.
*   Returns a promise that ultimately resolves to a response object, which contains the status of the promise with information the API sent back.
   [fetch() GET diagram](https://content.codecademy.com/courses/intermediate-javascript-requests/diagrams/fetch%20GET%20diagram.svg)


## fetch() POST Requests I

In the previous exercise, you successfully wrote a GET request using the fetch API and handled Promises to get word suggestions from Datamuse. Give yourself a pat on the back (or two to treat yourself)!

Now, you’re going to learn how to use `fetch()` to construct POST requests!

Take a look at the diagram to the right. It has the boilerplate code for a POST request using `fetch()`.

Notice that the initial call takes two arguments: an endpoint and an object that contains information needed for the POST request. The rest of the request is identical to the GET request.


[fetch() POST diagram](https://content.codecademy.com/courses/intermediate-javascript-requests/diagrams/fetch%20POST%20diagram.svg)

## async GET Requests I

Let’s take a minute to appreciate what you’ve accomplished so far:

*   used `fetch()` to make GET and POST requests.
*   check the status of the responses coming back
*   catch errors that might possibly arise
*   taking successful responses and rendering it on the webpage

That is fantastic! It’s the basis of how the internet works!

In the following exercises, we’re going to take what you’ve learned about chaining Promises and make it simpler using functionality introduced in ES8: `async` and `await`. You read that right, you did the hard part already, now it’s time to make it easier.

The structure for this request will also be slightly different. Notice the new keywords `async` and `await`, as well as the `try` and `catch` statements.

We’ll be going over how to write the boilerplate code for `async` GET requests in the next lesson.
*   [`async`/`await` GET diagram](https://content.codecademy.com/courses/intermediate-javascript-requests/diagrams/async%20await%20GET%20diagram.svg)


## async POST Requests I

Now that you’ve made an `async` GET request, let’s start on getting you familiar the `async` POST request.

As with the other GET and POST requests that you’ve been making, an `async` POST request requires more information. Take a look at the diagram.

We still have the same structure of using `try` and `catch` as before. But, in the `fetch()` call, we now have to include an additional argument that contains more information like `method` and `body`.

We’ll be explaining the why’s and how’s of the boilerplate code for `async` POST requests in the next lesson.
*   [`async`/`await` POST diagram](https://content.codecademy.com/courses/intermediate-javascript-requests/diagrams/async%20await%20POST%20diagram.svg)

--------------------

## Review Requests II

Let’s recap on the concepts covered in the previous exercises:

1.  GET and POST requests can be created a variety of ways.
    
2.  Use AJAX to asynchronously request data from APIs. `fetch()` and `async`/`await` are new functionalities developed in ES6 (promises) and ES8 respectively.
    
3.  Promises are a new type of JavaScript object that represent data that will eventually be returned from a request.
    
4.  `fetch()` is a web API that can be used to create requests. `fetch()` will return promises.
    
5.  We can chain `.then()` methods to handle promises returned by `fetch()`.
    
6.  The `.json()` method converts a returned promise to a JSON object.
    
7.  `async` is a keyword that is used to create functions that will return promises.
    
8.  `await` is a keyword that is used to tell a program to continue moving through the message queue while a promise resolves.
    
9.  `await` can only be used within functions declared with `async`.