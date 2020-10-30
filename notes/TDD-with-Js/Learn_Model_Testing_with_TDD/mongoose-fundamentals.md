# Mongoose Fundamentals

## Intro To Databases

Mongoose is a Node package that interacts with a running MongoDB database. Before learning about Mongoose, let’s define a couple of key terms:

*   _Data_
*   _Database_

#### What is Data?

Data in the context of software and web development is digital information.

#### What is a Database?

A database is a structured set of data held in a computer.

Databases support storage and manipulation of data. For a web application to have persistence, a developer uses a database to store data. The developer can write methods to create, read, update, and delete information in the database.

## Mongoose Collections & Documents

Mongo stores data in ‘binary’ JSON (BSON) documents. BSON documents have a similar structure to JavaScript objects.

MongoDB stores _documents_ in a _collection_. A MongoDB database is made up of these collections of documents.

A Mongo collection is like a table in a spreadsheet or relational database — each document is like a row in the spreadsheet.

Documents contain one or more key/value pairs. Each key has a corresponding value of a specified data type, like array, number, or string. MongoDB organizes documents with similar structure into collections.

&nbsp;

## Schemas

Mongoose is a JavaScript library that provides methods to interact with a MongoDB database. Mongoose translates JavaScript objects (JSON) to BSON data in a MongoDB database, and vice versa.

Mongoose interactions are based on Schema and Model declarations.

*   A _Schema_ defines the shape of the documents within that collection.
*   A _Model_ maps to a MongoDB collection and its documents.

### Mongoose Schema

Remember, each record in a MongoDB database is a document with key/value pairs as entries. Using Mongoose’s `Schema`, we can set the structure of those documents dynamically.

Imagine you were creating a Schema for the database of a web-based poetry application where you could both write and publish poems. Each key in our `poemSchema` will define a property in our documents which will be cast to its associated SchemaType.

```js
const poemSchema = new mongoose.Schema({
  title: String
})
```

Each document that is derived from the `poemSchema` above will have a `title` property with a string saved to it.

Mongoose will cast mismatched data types to the specified SchemaType. For example, if we entered the number `1` as a title for a poem, Mongoose would cast the entry so that it entered that database as a string `"1"`. Using casting, Mongoose ensures that string properties are assigned strings values.

&nbsp;

## Paths

The key-value pair in a schema is called a path. Paths define the name and type of fields in a MongoDB document.

```js
const poemSchema = new mongoose.Schema({
  title: String,
  body: [String],
  published: Boolean,
})
```

The schema above has three paths: `title`, `body`, and `published`. Each path is set to a different schema type. The `[String]` schema type, assigned to `body`, means a document that is derived from the `poemSchema` schema can store an array of strings to the `body` field.

[Paths in Mongoose can have many data types](http://mongoosejs.com/docs/schematypes.html
 ). Besides data types like string, integer, boolean, and array, Mongoose also provides:

*   Timestamp − timestamp. This can be handy for recording when a document has been modified or added.
*   Object ID − This datatype is used to store the document’s ID.

&nbsp;

## Validators

In our original poetry application example we declared the schema type for our `title` as a `String`:

```js
const poemSchema = new mongoose.Schema({
  title: String
})
```

Often, we want to specify more than just the type of a path — we can use _validators_ to ensure other aspects of a document’s input value.

### Validators

Data validation is intended to provide guarantees about user input. Mongoose has several built-in validators.

You can add required validators to our `Schema` in an object that you pass to the path:

```js
const poemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: [String],
    required: true
  },
  published: {
    type: Boolean,
    required: true
  },
})
```

In the example above, we set the schema type and required attributes for the `title`, `body`, and `published` paths. If the `required` property is true, then it is a required field when you save to the database.

If you save a document with an invalid path value, you will receive this error message ``Path `title` is required.``. You can define a custom error message like this:

```js
const poemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required!'
  }
})
```

[You can learn more about mongoose validators in their documentation.](http://mongoosejs.com/docs/validation.html)

&nbsp;

## Models

To use our `poemSchema` definition:

```js
const poemSchema = new mongoose.Schema({
  title: String,
});
```

we need to convert our `poemSchema` into a `Model` we can work with. `Schemas` provide the definition for a model. A model maps to a collection in your MongoDB database.

Models are defined by passing a Schema instance to `mongoose.model` like this:

```js
mongoose.model(modelName, schema):
```

The first argument is the singular name of the collection your model is for. The second argument is your previously created `Schema`. In the case of our poetry web app, turning our `schema` into a `model` would look like this:

```js
const Poem = mongoose.model('Poem', poemSchema); 
```

Models are constructors that we define based on our `Schema`. They represent documents which can be saved and retrieved from our database. All document creation and retrieval from the database is handled by these models.

&nbsp;

## Create

Our model is a class with properties that we define in our schema. We can construct documents as instances of our model. Creating documents and saving them to the database can be done by calling `.create()` on our model. In the poetry app example it would look like this:

```
const Poem = mongoose.model('Poem', poemSchema);
const poemProperties = {
    title: "Rewrite Reality" ,
    body: ["Re-imagine the consumption of the stagnant status quo", 
           "No matter how nice you dress", 
           "The emperor is still wearing no clothes"],
    published: false
}
runWithDatabase(async () => {
  // Create and save a document
  await Poem.create(poemProperties);
});
```

The `runWithDatabase` function is designed to accept a method as input, and run it after we connect to a database and before we disconnect from it. If you want to learn more about the methods in **database.js**, read the documentation for:

*   [Connect](http://mongoosejs.com/docs/api.html#index_Mongoose-connect)
*   [Drop](https://docs.mongodb.com/manual/reference/method/db.dropDatabase/)
*   [Disconnect](http://mongoosejs.com/docs/api.html#index_Mongoose-disconnect)

This would create a new document in our database, with the paths and properties defined in the code above. In the next exercise, we will learn how to query the database and confirm our application is successfully sending and retrieving information from our MongoDB collection of documents.

&nbsp;

## Queries

At this point, we will start creating instances in a MongoDB database, then query the database for the values we saved. All of the method calls and queries will be passed to `runWithDatabase()`.

If we wanted to search for the poem that we saved to the database, we could write a Mongoose query and call `.findOne()` on our `Poem` model:

```js
runWithDatabase(async () => {
   Poem.create(poemProperties)
   const poemMatch = await Poem.findOne({ title: 'Rewrite Reality' });
   console.log(`Found poem: ${poemMatch.body}`);
});
```

`.findOne()` returns a document that has a `title` path with the value `'Rewrite Reality'`. We confirm this by using `console.log()` to see the value of the path `body` for the returned document.

This is good when we are looking for one document. What if we wanted to find all the documents that matched a specified criteria? We can use `.find()`, which returns an array of all the documents that match the argument passed to it.

Imagine we had a collection of documents with the following values:

```js
const manyPoems = [
  {
    title: "Rewrite Reality" ,
    body: ["Re-imagine the consumption of the stagnant status quo",
               "No matter how nice you dress",
               "The emperor is still wearing no clothes"],
    published: false ,
},
  {
    title: "Phasing",
    body: ["I imagine myself a second moon;",
              "waning in and out of sequence with the tides"],
    published: true,
},
  {
    title: "One of Those Days",
    body: ["My shirt and spirit”,
             "are bent inside-out-backwards"],
    published: true,
}
]

```

In the example below, we create the above documents using a `Poem` model, then we use the `find` method to return all poems with a `published` property equal to true:

```js
runWithDatabase(async () => {
  Poem.create(manyPoems);
  let publishedPoems = await Poem.find({ published: true })
  // Check that it works by logging the number of returned documents
  console.log(`Published Poems: ${publishedPoems.length}`)
}); 
```

* * *

To the right, we’ve added **items.js** to your project. It contains an array of items that we will save to the MongoDB database. In **exercise.js**, we import the items from **items.js** and use `MagicItem.create()` to save the items as documents to our database.

&nbsp;

## Methods

Mongoose supports the creation of methods on both instances of documents and collections of documents (the model).

*   `.statics()` adds static “class” methods to the model.
*   `.methods()` adds an instance method to documents.

#### Model Methods — `.statics()`

For example, in our poetry app we could use `.statics()` to create a method named `firstAlphabetically`.

```js
const poemSchema = new mongoose.Schema({
...
)}
poemSchema.statics.firstAlphabetically = function(callback) {
  return this.findOne({}).sort('title').exec(callback);
}

```

The method is part of the model, which in this example would return the first document, after sorting the values of the `title` path alphabetically.

In order to use the new `.firstAlphabetically` method, we would call it inside `runWithDatabase()` on the `Poem` model like this:

```js
const Poem = mongoose.model('Poem', poemSchema);
runWithDatabase(async () => {
  Poem.create(properties));
  const firstAlpha = await Poem.firstAlphabetically();
  console.log(`The first poem alphabetically is: ${firstAlpha.title}. It goes like this: ${'\n'} ${firstAlpha.body}`);
  });
```

The `console.log()` logs the following in the terminal:

```js
The first poem alphabetically is: One of Those Days. It goes like this:
My shirt and spirit, are bent inside-out-backwards
```

#### Document Methods — `.methods()`

Instances of a model are documents. Documents have many of their own built-in instance methods. It is also possible to create custom document instance methods. Below, we create a method for our poem example to change the `published` path value to `true` on any document in the database.

```js
const poemSchema = new mongoose.Schema({
...
)}
poemSchema.methods.publish = function(callback) {
  this.published = true
  return this.save();
}
```

`.save()` writes the current JavaScript object as a MongoDB document.

Inside `runWithDatabase()` we could call `.publish()` on a document like this:

```js
const Poem = mongoose.model('Poem', poemSchema);
runWithDatabase(async () => {
  Poem.create(properties));
  ...
  const publishIt = await Poem.findOne({ title: 'Rewrite Reality' });
  console.log(publishIt.published)
  await publishIt.publish();
  console.log(`${publishIt.title} has had its publish field changed to ${publishIt.published}`)
  });

```

Here we use `.findOne` to locate the poem, and then `console.log()` the initial `publish` value, which is false. We call `.publish()` on it and `console.log()` again to see that it changed. The output in the terminal for this code would look this:

```
false
Rewrite Reality has had its publish field changed to true
```

--------------------

## Review

In this lesson, you learned how to use Mongoose to interact with a MongoDB database. Let’s review some of the topics that we covered:

*   Mongoose is a Node package that interacts with a running MongoDB database.
*   MongoDB stores documents in collections and collections of documents in databases. Each document has key-value pairs as entries.
*   Using a `Schema`, we can set the structure of documents dynamically, using `paths` with schema types and validators.
*   Models are JavaScript classes that we compile from our `Schema` definitions.
*   You can use models to create, read, update, and delete documents from a database.
*   You can query a database using `.find()` and `.findOne()`. [Mongo also provides query operators to allow for more complex queries.](https://docs.mongodb.com/v3.4/reference/operator/query-comparison/)

Mongoose also allows for the creation of methods associated with a database:

*   `.statics()` adds static “class” methods to the Models itself.
*   `.methods()` adds an instance method to documents.
