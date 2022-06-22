const Web3 = require("web3");
let web3;

if(typeof window !== 'undefined' && window.web3 !== 'undefined'){
  // We are on a browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
}else{
  // We are on the Server OR the user isn't runnig metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/4d539ad5da44453595cc1d281731878d'
  );
  web3 = new Web3(provider);
}

module.exports = web3;