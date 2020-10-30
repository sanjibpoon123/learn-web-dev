# Outside-In Test-Driven Development

When software engineers and development teams build new features, they’re faced with challenging questions along the way. Some include:

* Where do we start development? (Do I start writing HTML, or adding server implementation?)
* What is the most efficient implementation? (Is X implementation faster than Y implementation?)
* How will the new feature impact our existing code? (Will new code introduce a bug?)

*Outside-in test-driven development* doesn’t answer these questions, but provides you with an approach to finding an answer. It helps you avoid the decision paralysis that often slows development teams, leads to extended deadlines, and incomplete implementation.

In addition to the efficiencies discussed above, the outside-in approach is a satisfying way to develop a web application with a full test suite.

At the end of this article, you will know how to approach development of features in a full-stack web application using outside-in test-driven development.

## Red, Green, Refactor

Test-driven development (TDD) is the process of writing tests before implementation code. You use the feedback from your tests to inform the implementation of a feature or outcome.

A common approach to TDD is the red, green, refactor cycle. When you write a test before the implementation exists you start “in the red” phase, because your test fails and outputs a red error message. Next, you write the minimum implementation code to get your test to pass. This puts you “in the green” phase, because your test passes and outputs a green message.

Once you are in the green, you should consider whether your implementation is the best or most efficient approach. If you think your code could be written more efficiently or cleaner, then you enter the refactor phase. You can refactor your code with confidence, because you have tests that cover the expected behavior.

## Outside-in TDD

Outside-in TDD is an approach that developers use to build full-stack web applications. It leverages the same red, green, refactor steps that we covered above, but with one caveat — a failing test does not always inform you to write new implementation code. Instead, it may require that you implement new functionality at a different level.

You start at the top of the stack, the view, and write tests as you work your way towards the database layer.

If a test pushes you to a lower level, you restart your red, green, refactor cycle by writing a new test. This test informs the implementation at your new layer. You continue the TDD cycle at this lower level until:

* You need to drop another layer to implement the desired behavior
* You have addressed the reason for dropping to the current layer

Once you address the reason for dropping a layer, you can start working your way back up the testing pyramid. If you’re in the model/database layer, you step up to the server, and run your server tests to see if you get a different response. The response should be one of the following:

* The test passes — you can start another red, green, refactor cycle at the server level or step up to the view layer.
* The test fails — the server test that pushed you to the model layer fails, but for a different reason. This is common, and indicates that you’re making progress. This failure may indicate that you need to write additional implementation at the server level, or drop back to the model.

## Outside-in Example

We’re going to use the following as an example of how to develop a new feature with outside-in TDD: *You have a movie blog and want to develop a feature that renders user comments under your blog posts. The application should render no more than ten comments when a user lands on the web page. The application should present the comments in reverse chronological order (i.e. the most recent comment should be first).*

Let’s assume the web application generates HTML at the server — any updates to the view require implementation at the server level.

### Feature Testing

The first step is to write a feature test that checks if your web application is rendering comments to the browser. Let’s use the following outside-in TDD approach:

1. Write a test that checks for the presence of a comment under a blog post.
2. The test fails, because your web application does not render comments.
3. Because your web application generates HTML at the server layer, you drop to the server to address the error.

Although we could continue to write feature tests to check for the number of rendered comments, we know server tests are cheaper, so we can test those details when we drop a layer.

### Server Testing

At the server layer, we start by writing a test that informs the implementation of our server-generated HTML. Because our web application renders unique comments from the database, we want to check that the server-generated HTML is dynamic.

1. Write a test that checks for the presence of a dynamically generated comment element in the server HTML.
2. The test fails, so we add implementation for a server-generated comment.
3. Once we’re in the green and consider refactoring, we want to write a test that calls a method at the model layer, let’s call it `Comment.latest()`. At the server layer, we’ll check if the method returns comments from the database.
4. Because this method doesn’t exist, we must drop to the model/database layer.

### Model and Database Testing

At the model layer, we start by writing a test that informs the implementation of our `Comment.latest` method. This method requires that you interface with the web application’s database.

1. Write a test that checks if the `Comment.latest` method returns ten comments when the database has eleven comments.
2. Implement the `Comment.latest` method to return ten comments, so the test is green.
3. Once you’ve considered refactoring, write a test that checks whether the method returns the last ten comments in reverse chronological order.
4. Implement and refactor
5. Write a test that checks if `Comment.latest()` returns an empty array when your database is empty.
6. Implement and refactor
7. Write a test that checks if `Comment.latest` returns the correct number and order of comments when your database has between zero and ten comments in it.
8. Implement and refactor

### Taking Stock

At this point, your entire test suite should be green. You have written seven new tests, and the implementation code to make them pass — your web application should render the last ten comments from your database in reverse chronological order.

Let’s take stock of our seven new tests:

1. **Feature**: Comments are rendered to a user’s browser.
2. **Server**: The server generates an HTML field for comments.
3. **Server**: The server has access to ten comments from the database.
4. **Model**: The `Comment.latest` method returns ten comments from your database.
5. **Model**: The `Comment.latest` method returns the last ten comments in your database in reverse chronological order.
6. **Model**: The `Comment.latest` method returns an empty array when your database has zero comments.
7. **Model**: The `Comment.latest` method returns all of the comments when your database has between zero and ten comments.

Once your feature is working as expected, you should consider how your new tests fit into the broader test suite. The rest of the test suite could have few tests, or over one hundred. It’s time to refactor.

### Refactoring Your Test Suite

The way you approach refactoring will vary based on the size and types of tests in your suite. One guiding light in refactoring is to optimize the suite for confidence and speed. Because we used TDD to implement our comment feature, we should feel confident that our comments are working as expected, and the feature is fully covered.

Consider the questions below when deciding how to refactor your suite:

* How much longer does it take to run my test suite with these new tests?
* Is the additional amount of time that your test suite takes to run acceptable?
* Is there overlap between any of my new tests?
* Is there overlap between my new tests and existing tests?

Let’s take a moment to consider a few of these questions in the context of our test suite.

*How much longer does it take to run my test suite with these new tests?*

* You can calculate this value by running your test suite before and after writing the new tests, and calculate the difference. Seven new tests, like the ones above may only add a few seconds to your suite. Let’s use our next question to think about how you can evaluate what an acceptable amount of time may be.

*Is the additional amount of time that your test suite takes to run acceptable?*

* Although a few seconds may seem acceptable, this time can add up as your suite grows. Even if you’re comfortable with the additional time, you should always consider whether you can make speed improvements that don’t impact confidence.

*Is there overlap between any of my new tests?*

* You should consider if any new tests, especially in the feature or server level, can be deleted without impacting your confidence that the comments feature works as expected. For example, our first server test checks if the server generates an HTML field for comments. Your feature-level test checks the same functionality — it also takes longer, but provides a higher level of confidence. We decide to delete the server test for reasons we will investigate when we consider our next question.

*Is there overlap between my new tests and existing tests?*

* Next, you should look outside your seven (now six) new tests to consider the coverage offered by the other tests in your suite. Often, your test suite will have a feature test that checks whether the web page renders as expected — this is usually good enough coverage for most new features. Given the cost of feature-level tests, and the coverage of your lower-level tests, it often makes sense to delete the new feature-level test.