const BinarySearchTree = require('./BinarySearchTree');
const searchHelper = require('./searching-helper');

const binarySearch = function(array, targetValue, start, end) {

    console.log(`~~~~~~~~~~~~~~`);
    
    // define default or provided values for start and end
    var start = (start === undefined)
        ? 0
        : start;
    var end = (end === undefined)
        ? array.length
        : end;
    
    console.log(`Start is ${start}.`);
    console.log(`End is ${end}.`);

    if (start > end) {
        return -1;
    }

    const index = Math.floor( (start + end) / 2 );
    console.log(`Index is ${index}.`);

    const item = array[index];
    console.log(`Item is ${item}.`);

    if (item == targetValue) {
        return index;
    } else if (item < targetValue) {
        return binarySearch(array, targetValue, index+1, end);
    } else if (item > targetValue) {
        return binarySearch(array, targetValue, start, index-1);
    }

}

const testArray = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];

//console.log(binarySearch(testArray, 16));

const deweySearch = function(deweyDecimal, title) {

    // Convert dewey decimal number into a single integer, by simply removing decimal places

    // Implement a standard binary search for that number

    // Check to see when the book title is found within the array of values associated with a single DDN (key)

}

const testTree1 = new BinarySearchTree();

testTree1.insert(25, 25);
testTree1.insert(15, 15);
testTree1.insert(50, 50);
testTree1.insert(10, 10);
testTree1.insert(24, 24);
testTree1.insert(35, 35);
testTree1.insert(70, 70);
testTree1.insert(4, 4);
testTree1.insert(12, 12);
testTree1.insert(18, 18);
testTree1.insert(31, 31);
testTree1.insert(44, 44);
testTree1.insert(66, 66);
testTree1.insert(90, 90);
testTree1.insert(22, 22);

//console.log(searchHelper.inOrder(testTree1));

//console.log('In order:');
//console.log(testTree1.inOrder());

//console.log('Preorder:');
//console.log(testTree1.preOrder());

//console.log('Postorder:');
//console.log(testTree1.postOrder());

const sharePrices = [128, 97, 121, 123, 98, 97, 185];

const findMaxProfit = function(pricesArray) {

    let bestProfit = 0;
    let buyDay = 0;
    let sellDay = 0;

    for (let i=0 ; i<pricesArray.length ; i++) {

        //console.log(pricesArray[i]);
        for (let j=i+1 ; j<pricesArray.length ; j++) {
            const profit = pricesArray[j] - pricesArray[i];
            if (profit > bestProfit) {
                bestProfit = profit;
                buyDay = i+1;
                sellDay = j+1;
            }
        }
    }

    return `For max profit of $${bestProfit}, buy on Day #${buyDay} and sell on Day #${sellDay}.`;
}

const maxProfit = findMaxProfit(sharePrices);

console.log(maxProfit);