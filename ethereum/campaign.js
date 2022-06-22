import web3 from './web3';
import Campaign from './contractJSON/Campaign.json';

//searching for contract at particular address
export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Campaign.interface),
    address
  );
}