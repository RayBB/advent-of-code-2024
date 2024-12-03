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
    const result = rawData.match(/mul\(\d\d?\d?,\d\d?\d?\)/g)
    .map(mul=>mul.match(/\d+/g)) // extract the numbers as strings
    .map(mul=>[parseInt(mul[0]),parseInt(mul[1])])// turn into numbers
    .map(mul=>mul[0]*mul[1])// multiply
    .reduce((prev,cur)=>prev+cur,0) // add all up
    console.log(result)
}