const {checkInventory, processPayment, shipOrder} = require('./library');

const order = {
    items: [
        ['sunglasses', 1], ['bags', 2]
    ],
    giftcardBalance: 390.82,
}

checkInventory(order)
    .then((resolvedValueArray) => {
        return processPayment(resolvedValueArray);
    })
    .then((resolvedValueArray) => {
        return shipOrder(resolvedValueArray);
    })
    .then((successMessage) => {
        console.log(successMessage);
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    });

