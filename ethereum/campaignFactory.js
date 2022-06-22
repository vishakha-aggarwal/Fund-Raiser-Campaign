import web3 from './web3';
import CampaginFactory from './contractJSON/CampaignFactory.json';

//searching for contract at particular address
const instance = new web3.eth.Contract(
  JSON.parse(CampaginFactory.interface),
  '0x0051948F0796508C43f608C69e2fECe8b507Eba4'
);

export default instance;