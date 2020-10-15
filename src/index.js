/**
 * Shows how to use 'events', a core node module.
 */

 // Here we require in the 'events' module and save a reference to it in an events variable
 const events = require('events');

 // silly listener callback
 const celebrateListener = (specialOccassion) => {
     console.log("Let's celebrate " + specialOccassion)
 }

 const myEmitter = new events.EventEmitter();
 myEmitter.on('celebration', celebrateListener);
 myEmitter.emit('celebration', 'Diwali');
