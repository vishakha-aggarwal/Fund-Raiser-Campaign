import web3 from './web3';
import CampaginFactory from './contractJSON/CampaignFactory.json';

//searching for contract at particular address
const instance = new web3.eth.Contract(
  JSON.parse(CampaginFactory.interface),
  '0xa6b2F04bDdA059A1386D8Eab8e2e04f1d4cBB1ee'
);

export default instance;