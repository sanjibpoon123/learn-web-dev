const testNumber = require('./game');

process.stdout.write("I'm thinking of a number from 1 through 10. What do you think it is? \n('q' to quit) \n\nIs the number: ...")

const playGame = (userInput) => {
    let input = userInput.toString().trim();
    testNumber(input);
}

process.stdin.on('data', playGame);