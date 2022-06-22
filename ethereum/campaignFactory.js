import web3 from './web3';
import CampaginFactory from './contractJSON/CampaignFactory.json';

//searching for contract at particular address
const instance = new web3.eth.Contract(
  JSON.parse(CampaginFactory.interface),
  '0xcA3e07d9740423a654CEB03525964a66906Fb687'
);

export default instance;