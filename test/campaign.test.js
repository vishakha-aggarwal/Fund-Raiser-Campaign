const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const campaign = require("../ethereum/contractJSON/Campaign.json");
const campaignFactory = require("../ethereum/contractJSON/CampaignFactory.json");

let factory;
let newCampaign;
let campaignAddress;
let accounts;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(campaignFactory.interface))
    .deploy({ data: campaignFactory.bytecode })
    .send({from : accounts[0], gas:'3000000'})

    await factory.methods.createCampaign(100, "First camp", "plz give me funds", 100).send({
        from: accounts[0],
        gas: '3000000'
    });

    campaignAddress = await factory.methods.getDeployedCampaigns().call();
    newCampaign = await new web3.eth.Contract(
        JSON.parse(campaign.interface),
        campaignAddress[0]);
}); 

describe('Campaigns', () => {

    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(newCampaign.options.address);
    });
  
    it('getting campaign manager', async () => {
        const manager = await newCampaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });
  
    it('contribute', async () => {
        await newCampaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
        const isContributor = await newCampaign.methods.contributers(accounts[1]).call();
        assert(isContributor);
    });
  
    it('requires a minimum contribution', async () => {
        try {
            await newCampaign.methods.contribute().send({
              value: '5',
              from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });
  
    it('make a payment request', async () => {
      await newCampaign.methods.createRequest('Buy batteries', 100, accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });
      const request = await newCampaign.methods.requests(0).call();
      assert.equal('Buy batteries', request.description);
    });
  
    it('processes requests', async () => {
  
      await newCampaign.methods.contribute().send({
        from: accounts[1],
        value: web3.utils.toWei('10', 'ether')
      });
  
      await newCampaign.methods
        .createRequest('Buy batteries', web3.utils.toWei('5', 'ether'), accounts[2])
        .send({ from: accounts[0], gas: '1000000' });
  
      await newCampaign.methods.approveRequest(0).send({
        from: accounts[1],
        gas: '1000000'
      });
  
      await newCampaign.methods.finalizeTransaction(0).send({
        from: accounts[0],
        gas: '1000000'
      });
  
      let balance = await web3.eth.getBalance(accounts[2]);
      balance = web3.utils.fromWei(balance, 'ether');
      balance = parseFloat(balance);
  
      assert(balance > 104);
    });
});