const path = require('path');
const fs = require('fs');
const solc = require('solc');
const { join } = require('path');

const jsonPath = path.resolve(__dirname, 'contractJSON');
fs.rmdirSync(jsonPath);

const Path = path.join(__dirname, 'contracts' , 'campaign.sol');
const source = fs.readFileSync(Path, "utf-8");

// console.log(solc.compile(source, 1));    
let output = solc.compile(source, 1).contracts;
fs.mkdirSync(jsonPath);
// console.log(jsonPath);
for(let contract in output)
{
    let filename = `./contractJSON/${contract.replace(":", "")}.json`;
    fs.writeFileSync(filename, JSON.stringify(output[contract]));
}