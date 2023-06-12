import Web3 from 'web3';
var web3;

if(process.env.NODE_ENV!=="production")
  require("dotenv").config({path:"./config.env"});

if (typeof window !== 'undefined') {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new Web3.providers.HttpProvider(process.env.infuraApiKey);
        web3 = new Web3(window.ethereum);
    } else if (window.web3)
        web3 = window.web3;
    else {
        const provider = new Web3.providers.HttpProvider(process.env.infuraApiKey);
        web3 = new Web3(provider);
    }
}
else {
    const provider = new Web3.providers.HttpProvider(process.env.infuraApiKey);
    web3 = new Web3(provider);
}
export default web3;