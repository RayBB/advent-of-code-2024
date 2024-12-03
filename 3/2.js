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
    let keepItem = true;
    const result = rawData.match(/mul\(\d\d?\d?,\d\d?\d?\)|do\(\)|don\'t\(\)/g)
    .filter((value)=>{ // remove all the do's, don't and everything after don'ts
        if (value == "do()"){
            keepItem = true;
            return false; // always get rid of these commands
        }
        if (value == "don't()"){
            keepItem = false;
            return false; // always get rid of these commands
        }
        return keepItem;
    })
    .map(mul=>mul.match(/\d+/g)) // extract the numbers as strings
    .map(mul=>[parseInt(mul[0]),parseInt(mul[1])])// turn into numbers
    .map(mul=>mul[0]*mul[1])// multiply
    .reduce((prev,cur)=>prev+cur,0) // add all up
    console.log(result)
}