import Web3 from 'web3';

var web3;

if (typeof window !== 'undefined') {
    if(window.web3 !== 'undefined'){
        const provider = new Web3.providers.HttpProvider(
            'https://rinkeby.infura.io/v3/4d539ad5da44453595cc1d281731878d'
            );
        web3 = new Web3(provider);
    } else{
        web3 = new Web3(window.web3.currentProvider);
    }
} else {
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/4d539ad5da44453595cc1d281731878d'
        );
    web3 = new Web3(provider);
}

export default web3;