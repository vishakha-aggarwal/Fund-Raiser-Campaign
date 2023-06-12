const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require('web3');
const campaignFactory = require('./contractJSON/CampaignFactory.json');

if(process.env.NODE_ENV!=="production")
  require("dotenv").config({path:"./config.env"});

const provider = new HDWalletProvider({
    mnemonic: process.env.mnemonic,
    providerOrUrl: process.env.infuraApiKey});

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
// Contract deployed to 0xb7FCd191Ca6a4e9E13279193A9997b126cE17a54