# Express Routers

*Routers* are mini versions of Express applications — they provide functionality for handling route matching, requests, and sending responses, but *they do not start a separate server or listen on their own ports*. Routers use all the `.get()`, `.put()`, `.post()`, and `.delete()` routes that you know and love.

&nbsp;
&nbsp;

## 1. Express.Router

An **Express router** provides a subset of Express methods. To create an instance of one, we *invoke the `.Router()` method on the top-level Express import.*

To use a router, **we mount it at a certain path using `app.use()` and pass in the router as the second argument**. This router will now be used for all paths that begin with that path segment. To create a router to handle all requests beginning with `/monsters`, the code would look like this:

```javascript
const express = require('express');
const app = express();

const monsters = {
  '1': {
    name: 'godzilla',
    age: 250000000
  },
  '2': {
    Name: 'manticore',
    age: 21
  }
}

const monstersRouter = express.Router();

app.use('/monsters', monstersRouter);

monstersRouter.get('/:id', (req, res, next) => {
  const monster = monsters[req.params.id];
  If (monster) {
    res.send(monster);
  } else {
    res.status(404).send();
  }
});
```

Inside the `monstersRouter`, all matching routes are assumed to have `/monsters` prepended, as it is *mounted at that path*. `monstersRouter.get('/:id')` matches the full path `/monsters/:id`.

When a `GET` `/monsters/1` request arrives, Express matches `/monsters` in `app.use()` because the beginning of the path (`'/monsters'`) matches. Express’ route-matching algorithm enters the `monstersRouter`‘s routes to search for full path matches. Since `monstersRouter.get('/:id)` is *mounted* at `/monsters`, the two paths together match the entire request path (`/monsters/1`), so the route matches and the callback is invoked. The `'godzilla'` `monster` is fetched from the `monsters` array and sent back.

&nbsp;
&nbsp;

## 2. Using Multiple Router Files

Generally, we will keep each router in its own file, and `require` them in the main application. This allows us to keep our code clean and our files short.

To do this with `monstersRouter`, we would create a new file `monsters.js` and move all code related to /monsters requests into it.

```javascript
// monsters.js
const express = require('express');
const monstersRouter = express.Router();

const monsters = {
  '1': {
    name: 'godzilla',
    age: 250000000
  },
  '2': {
    Name: 'manticore',
    age: 21
  }
}

monstersRouter.get('/:id', (req, res, next) => {
  const monster = monsters[req.params.id];
  if (monster) {
    res.send(monster);
  } else {
    res.status(404).send();
  }
});

module.exports = monstersRouter;
```

This code contains all the `monsters` specific code. In a more full-fledged API, *this file would contain multiple routes*. To use this router in another file, we use `module.exports` so that other files can access `monstersRouter`. The only other new line of code required is that Express must be required in each file, since we’ll need to create a router with `express.Router()`.

Our `main.js` file could then be refactored to import the `monstersRouter`:

```javascript
// main.js
const express = require('express');
const app = express();
const monstersRouter = require('./monsters.js');

app.use('/monsters', monstersRouter);
```

In this example, the `monstersRouter` is required in `main.js` from `monsters.js` and used exactly as it was before.
