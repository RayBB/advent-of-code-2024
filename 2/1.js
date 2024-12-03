const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    // Print the contents of the file to the console
    //console.log(data);
    main(data);
});

function main(rawData){
    const result = rawData.split("\n")// split into lines
    .map(line=>line.split(" "))// split into array of str numbers ("12")
    .map(line=>
        line.map(numb=> parseInt(numb))
    )
    .map(line=>allArrayDiffsInRange(line) && allNumbersInArraySameDirection(line))
    .filter(line=>line==true)
    console.log(result.length)
}

function allNumbersInArraySameDirection(arr){
    // Given [1,2,3] check the numbers are all increasing or all decreasing
    // so [1,3,2] would be false
    const example = arr;
    return example.every((val, i, arr)=>{
        // first item is always true
        if (i == 0) return true;
        // if the first item is better than second, then all the other items need to be bigger than the one before them 
        if (arr[0] > arr[1]){
            return arr[i-1] > arr[i];
        } else {
            return arr[i-1] < arr[i];
        }
    })
}
// Tests for allNumbersInArraySameDirection
const ascending = [1,2,3];
console.log(ascending, "true", allNumbersInArraySameDirection(ascending))
const descending = [3,2,1];
console.log(descending, "true", allNumbersInArraySameDirection(descending))
const broke = [1,3,2];
console.log(broke, "false", allNumbersInArraySameDirection(broke))


function numberInRange(first, second){
    const RANGE_MIN = 1;
    const RANGE_MAX = 3;
    const diff = Math.abs(first - second);
    return diff >= 1 && diff <= 3
}

//tests
console.log(numberInRange(1,1), "false")
console.log(numberInRange(1,2), "true")
console.log(numberInRange(2,1), "true")
console.log(numberInRange(1,4), "true")
console.log(numberInRange(1,5), "false")

function allArrayDiffsInRange(array){
    return array.every((val,i,arr)=>{
        // first item is always true
        if (i == 0) return true;
        return numberInRange(arr[i], arr[i-1]);
    })
}

//tests
console.log("allArrayDiffsInRange")
console.log(allArrayDiffsInRange([1,2,3,4]), "true")
console.log(allArrayDiffsInRange([4,3,2,1]), "true")
console.log(allArrayDiffsInRange([1,6,7,8]), "false")