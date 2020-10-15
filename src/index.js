/*
* Accessing the Process Object
*/

let initalMemory = process.memoryUsage().heapUsed;
let word = process.argv[2];

console.log(`\n\nYour word is ${word}`);

//Create a new array
const wordArray = [];

// Loop 1000 times, pushing the same intem into the the array each time
for (let i = 0; i < 1000; i++) {
    wordArray.push(`${word} count: ${i}`);
}

console.log(`Starting memory usage:\t ${initalMemory}.\n
Current memory usage: ${process.memoryUsage().heapUsed}.\n\n
After using the loop to add elements to the array, the process is using ${process.memoryUsage().heapUsed - initalMemory} more bytes of memory`);