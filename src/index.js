/**
 * Simple program that makes Cat and Dog fight. 
 * 
 * Purpose of this program is to illustrate how to import and export modules in node.js
 */

 const Dog = require("./dog.js");
 const Cat = require("./cat.js");


 const fight = (dog, cat) => {
     let winner = dog.name;
     if (cat.clawStrength > dog.toothStrength) {
         winner = cat.name;
     }
    else if (cat.clawStrength === dog.toothStrength) {
        winner = "Nobody";
    }

    console.log(`${winner} wins!`);
 }


 const myDog = new Dog('Danny', Math.random());
 const myCat = new Cat('Tabby', Math.random());

 fight(myDog, myCat);