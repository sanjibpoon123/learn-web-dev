// Use fs.readFile() to figure out the secret word and assign
// that value to the secretWord variable
const fs = require('fs');

let secretWord = null;

let readDataCallback = (err, data) => {
    if (err) {
        console.log(`Something went wrong: ${err}`);
    } else {
        console.log(`Provided file contained: ${data}`);
    }
};

fs.readFile('finalFile.txt', 'utf-8', readDataCallback);

// Above code is executed before we find the value of secretWord
secretWord = "cheeseburgerpizzabagels";
