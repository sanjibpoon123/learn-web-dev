/**
 * Represents Store
 */
const store = {
    sunglasses: {
        inventory: 817,
        cost: 9.99,
    },
    
    pants: {
        inventory: 236,
        cost: 7.99,
    },

    bags: {
        inventory: 17,
        cost: 12.99,
    },
}

const checkInventory = order => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const itemsArray = order.items;
            let inStock = itemsArray.every(item => store[item[0]].inventory >= item[1]);

            if (inStock) {
                let totalCost = 0;
                itemsArray.forEach(item => {
                    totalCost += item[1] * store[item[0]].cost;
                });

                console.log(`All of the items are in stock. The toal cost of the order is \$${totalCost}`);
                
                resolve([order, totalCost])
            } else {
                reject(`The order could not be completed because some items are sold out.`);
            }

        }, generateRandomDelay());

    });
};

/**
 * Process payment according to the balance available.
 * @param {Array} responseArray - first element order, second element total cost.
 */
const processPayment = responseArray => {
    const order = responseArray[0];
    const totalCost = responseArray[1];

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            let hasEnoughBalance = order.giftcardBalance >= totalCost;

            if (hasEnoughBalance) {
                console.log(`Payment processed with giftcard. Generating shipping label.`);
                let trackingNum = generateTrackingNumber();
                resolve([order, trackingNum]);
            } else {
                reject('Cannot process order: giftcard balance was insufficient.');
            }

        }, generateRandomDelay());
    });
};

/**
 * Ships the order.
 * @param {Array} responseArray - Contains order and tracking number
 */
const shipOrder = (responseArray) => {
    const order = responseArray[0];
    const trackingNum = responseArray[1];

    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            resolve(`The order has been shipped. The tracking number is: ${trackingNum}`);
        }, generateRandomDelay());
    });
};


/**
 * Generates dummy tracking number. Only for development purpose. 
 */
const generateTrackingNumber = () => Math.floor(Math.random() * 1000000);

/**
 * Generates random number to serve as delay in a setTimeout()
 */
const generateRandomDelay = () => Math.floor(Math.random() * 2000);

module.exports = {checkInventory, processPayment, shipOrder};