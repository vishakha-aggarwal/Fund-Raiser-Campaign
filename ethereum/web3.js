import Web3 from 'web3';
var web3;

if (typeof window !== 'undefined') {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/4d539ad5da44453595cc1d281731878d');
        web3 = new Web3(window.ethereum);
    } else if (window.web3)
        web3 = window.web3;
    else {
        const provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/4d539ad5da44453595cc1d281731878d');
        web3 = new Web3(provider);
    }
}
else {
    const provider = new Web3.providers.HttpProvider('https://goerli.infura.io/v3/4d539ad5da44453595cc1d281731878d');
    web3 = new Web3(provider);
}
export default web3;