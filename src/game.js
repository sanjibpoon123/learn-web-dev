// value that user needs to find
const secretValue = Math.floor(1 + Math.random() * 10).toString();

const validGuessNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const testNumber = input => {
    if (input === 'q') {
        process.stdout.write("Ok. Bye!\n");
        process.exit();
    }

    if (!validGuessNum.includes(input)) {
        process.stdout.write("\nOnly 1-10 is allowed. \nIs the number: ...")
    } else if (input === secretValue) {
        process.stdout.write('Woah you got it! Are you psychic? See you later!\n');
    } else {
        process.stdout.write("Nope. Gues again! \nIs the number: ...");
    }
}

module.exports = testNumber;