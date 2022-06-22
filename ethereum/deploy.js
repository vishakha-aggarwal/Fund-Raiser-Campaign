const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const campaignFactory = require('./contractJSON/CampaignFactory.json');

const provider = new HDWalletProvider({
    mnemonic: 'barely cool party wet sweet grocery warm fresh sibling lab kiss reopen',
    providerOrUrl: 'https://rinkeby.infura.io/v3/4d539ad5da44453595cc1d281731878d'
});

const web3 = new Web3(provider); 

const deploy = async() => {

    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account" , accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(campaignFactory.interface))
    .deploy({ data: campaignFactory.bytecode })
    .send({from : accounts[0], gas:'3000000'})
    console.log('Contract deployed to', result.options.address);

};

deploy();
// Attempting to deploy from account 0xbE174795281F6516F9595e0B0D1558485a4802D5
// Contract deployed to 0xcA3e07d9740423a654CEB03525964a66906Fb687