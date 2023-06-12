import web3 from './web3';
import CampaginFactory from './contractJSON/CampaignFactory.json';

//searching for contract at particular address
const instance = new web3.eth.Contract(
  JSON.parse(CampaginFactory.interface),
  '0xb7FCd191Ca6a4e9E13279193A9997b126cE17a54'
);

export default instance;