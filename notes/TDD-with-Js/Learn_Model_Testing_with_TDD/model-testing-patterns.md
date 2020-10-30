# Model Testing Patterns

## Introduction

A chat app manages messages, users, and chat rooms. A restaurant app manages customers, tables, and orders. How do applications define these entities and their interactions? The answer is the _model layer_.

Models represent the entities and interactions in a web application’s problem domain: the area of knowledge surrounding a problem. A chat app’s problem domain includes messages, users, and chat rooms; a restaurant’s includes customers, tables, and orders. A model can define each entity, describe the shape of the data stored for each entity, validate the data, store it in a database, and interact with it.

In this lesson, you will learn TDD techniques to develop a model layer using JavaScript with the Mongoose node package and a MongoDB database. For testing, you’ll be using a Mocha test framework and the Chai assertion library.

To better understand the concept of a _model_, take this example: a full-stack web application manages the inventory of a zoo. It can add animals, remove animals, count animals, and store that information for later use. The app can be divided into three layers:

*   Front-end: a webpage with buttons to allow users to add and remove animals. Could be implemented with HTML and CSS.
*   Server: an application to handle HTTP requests and responses. It routes requests, like the addition and removal of animals, and defines responses, like the count of animals after addition/removal. Could be implemented with Express.
*   Database and Models: storage and shape of the animal data. The data is grouped by animal, each with properties like species name, count, and risk-level. These fields and the methods to interact with them are defined by models, and the storage is managed by a database. Could be implemented with Mongoose models and a MongoDB database.

Just like any other software, you can develop models using Test-Driven Development (TDD). The following exercises will help you write tests specific to the model layer.

**Instructions:**

The zoo for this application keeps a particular type of animal. Get familiar with the data displayed on the right. You will be implementing a model for that data throughout this lesson.
(https://content.codecademy.com/courses/learn-tdd-testing-models/tabular_dino_data.svg)

&nbsp;

## Path Definition

In test-driving the zoo application, you receive this error message in the server layer:

![](https://content.codecademy.com/courses/learn-tdd-testing-models/path-definition-alt.png)

You’re in the red! To get to green you have to drop to the model layer and define the Dinosaur model.

You’ll need multiple model tests to satisfy this server test. Since they don’t touch HTML/CSS selectors nor HTTP actions/status codes, model tests are typically faster than feature-level and server-level tests. Driving the Dinosaur implementation with model tests — rather than feature or server tests — will make your test suite run faster. The model tests will confirm that:

1.  the Dinosaur model is defined
2.  the Dinosaur model has a path called `name`

Your first test will cover conditions 1 and 2 by creating an instance of a Dinosaur model with a `name`, then asserting that the `name` path (also referred to as field or property) can be retrieved.

You can review the [Mongoose guide](http://mongoosejs.com/docs/guide.html) for defining a schema and the model documentation for creating models and instances.

&nbsp;

## Hooks

Before getting any further, let’s recall some good TDD practices:

*   make your tests _expressive_ by writing them in four phases
*   make your tests _isolated_ with setup and teardown phases
*   follow the [red, green, refactor cycle](https://www.codecademy.com/articles/tdd-red-green-refactor)

In this lesson you will be writing your setup and teardown phases in `beforeEach` and `afterEach` hooks provided by [Mocha](https://mochajs.org/).

Before each test, your `beforeEach` hook will [connect](http://mongoosejs.com/docs/api.html#index_Mongoose-connect
) to the database and [drop](https://docs.mongodb.com/manual/reference/method/db.dropDatabase/) any old data using these method calls:

```js
await mongoose.connect(databaseUrl, options);
await mongoose.connection.db.dropDatabase();
```

After each test, your `afterEach` hook will [disconnect](http://mongoosejs.com/docs/api.html#index_Mongoose-disconnect
) from the database with

```js
await mongoose.disconnect();
```

You can refactor these hooks by wrapping the three calls in two helper functions: `connectAndDrop` and `disconnect`. In your test file, import those functions and add them to your hooks.

&nbsp;

## Path Validation I

According to the Department of Dino Zoo Control (DDZC), the zoo isn’t safe with more than 10 of any one type of Dinosaur.

At this point your Dinosaur model has `name`, `count`, and `risk` properties and you have some server tests written. One of those tests expects a warning message when adding more than 10 dinosaurs, but you receive the following error message:

![](https://content.codecademy.com/courses/learn-tdd-testing-models/path-validation-I-alt-2.png)

This error occurred because the Dinosaur model has no validation! You can ensure the safety of the zoo by adding a validator function.

In this exercise you’ll be using a [custom validator function](http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate). It receives the value to validate as its first argument. It returns a Boolean, which is `false` if the value fails validation. Avoid arrow notation `() =>`. Using `function()` notation preserves the proper binding of `this`. Here’s the syntax:

```js
// Define validator
validate = function (value) {
  ...
}
// Add validator to Schema
const DinosaurSchema = new Schema({
  count: {
    type: Number,
    validate: [validator, 'custom err msg']
  }
});
```

Since validation is a model-level concern, you’ll need to test at the model layer. You can test validation like this:

1.  Create an instance of a model with validators and execute the validations with the `validateSync` method. Any validation errors will be stored in `[instance].errors.[path]`, like `dino.errors.count`.
2.  Make assertions on `[instance].errors.[path]` and its properties.

For more information on validators visit the Validation section of the Mongoose guide: [http://mongoosejs.com/docs/validation.html](http://mongoosejs.com/docs/validation.html).

&nbsp;

## Path Validation II

Your test passes and the model technically satisfies the DDZC’s no-more-than-10 regulation. But as it currently exists, there are two issues:

*   the validation error message is not helpful, and
*   the validation function will invalidate a count of any value.

Before you write the code to fix the issues, you’ll need more failing tests.

Remember that validation error messages are defined in the schema like this:

```js
age: {
   type: Number,
   validate: [validator, 'Age must be above 9.']
}
```

And you can assert the value of multiple properties of `[instance].errors.[path]` like `message`, `path`, `kind`, and `name`. You can write out multiple assertions or use [`assert.include`](http://chaijs.com/api/assert/#method_include):

```js
 const errorInfo = person.errors.age;
  assert.include(errorInfo, {
    message: 'Age must be above 9.',
    path: 'age',
    kind: 'user defined',
    name: 'ValidatorError'
  });
```

The complete list of validators are available here: [http://mongoosejs.com/docs/schematypes.html](http://mongoosejs.com/docs/schematypes.html).

&nbsp;

## Methods I

Now that you’ve tested the persistence of data, you’ll need methods to access that data.

Mongoose schemas support

*   _static methods_: methods called by a model. They typically operate on a collection of documents (instances of the model).
*   _instance methods_: methods called by an instance of a model. They typically operate on the document (model instance) itself.

From the previous exercise, you might recognize `Dinosaur.findOne()` as a static method and `dino.save()` as an instance method.

Sometimes you need to define additional methods for your application, like if you see a server-level error such as this:

![](https://content.codecademy.com/courses/learn-tdd-testing-models/methods-I-alt-1.png)

This server test is failing because there is no model method to find Dinosaurs by name. You’ll need to drop to the model layer and write more tests.

The desired query is performed on a collection of documents, so it requires a static method, which is defined in `[schema].statics` and called according to the example below.

```js
// static method - implementation
DinosaurSchema.statics.findByName = function(name, callback) {
  return this.findOne({ name: name }, callback);
};
// static method - call the method
await Dinosaur.findByName('Velociraptor')
```

Use `function()` notation instead of arrow `=>` notation to properly bind `this`.

You can test-drive the development of this method just like any other JavaScript method: Call the method and make assertions on its output.

&nbsp;

## Methods II

Sometimes you need an instance method for your application, like if you see a server-level error such as this:

![](https://content.codecademy.com/courses/learn-tdd-testing-models/methods-II-alt-1.png)

This server test expects an increase to the dinosaur `count`, which is a responsibility of the Dinosaur model. You’ll need to drop to the model layer and test for a `.breed()` method.

`.breed()` will increase the `count` of one dinosaur. This kind of method is specific to an instance of a model, so you’ll need to define it as an instance method. Do this by storing it in `[schema].methods` as shown below.

```js
// instance method - implementation
DinosaurSchema.methods.breed = function() {
  this.count = this.count + 1;
};
// instance method - call the method
dino.breed()
```

Use `function()` notation instead of arrow `=>` notation to properly bind `this`.

You can test-drive the development of this method just like any other JavaScript method: Call the method and make assertions on its output.
Model Testing Patterns

-----------------

## Review

You have developed a model using TDD!

*   The _model layer_ represents entities and interactions in a web app’s problem domain.
*   Model paths can be test-driven using validators. Call `validateSync` and make assertions on the properties of `[instance].errors.[path]`.
*   The storage of data can be tested with [construction and updating methods](http://mongoosejs.com/docs/models.html) like `save` and `update`. Retrieval can be tested with [query methods](http://mongoosejs.com/docs/queries.html) like `find`, `findOne`, and `findby`.
*   _Static methods_ are stored in `[schema].statics` and _instance methods_ are stored in `[schema].methods`. Both can be tested like any other JavaScript function.

To learn more about Mongoose, read the [guide](http://mongoosejs.com/docs/guide.html) and refer to the [API docs](http://mongoosejs.com/docs/api.html) as needed.
