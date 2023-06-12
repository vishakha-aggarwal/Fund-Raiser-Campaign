import React, { useState } from 'react'
import campaignFactory from '../../ethereum/campaignFactory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function newCampaign() {

  let [minimumContribution, setMinimumContribution] = useState("");
  let [description, setDescription] = useState("");
  let [campaignName, setCampaignName] = useState("");
  let [amountReq, setAmountReq] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  
  let submitForm = async (event) => {

    event.preventDefault();
    setError('');
    // console.log(event.value);
    
    document.getElementById("createCampaign").innerHTML = "Loading.. Please dont Click";
    setLoading(true);

    try{
      const accounts = await web3.eth.getAccounts();
      // console.log(web3);
      let minamount = web3.utils.toWei(minimumContribution, 'ether');
      await campaignFactory.methods.createCampaign(minamount, campaignName, description, amountReq).send({
          from: accounts[0]
        });
      Router.pushRoute('/');
    } catch (err) {
       setError(err.message);
    }
    setLoading(false);
    document.getElementById("createCampaign").innerHTML = "Create";
  }

  return (
    <div>
      <Header />
      <div className='showCampaignHeading'>Create Campaign</div>
      <div className='newCampForm'>
        <form onSubmit={submitForm}>
          Campaign Name: <br/> <input name = "campaignName" onChange={e => setCampaignName(e.target.value)} placeholder = "Enter Campaign Name"/><br />
          Description: <br/> <textarea name = "description" width = "400px" height= "100px" onChange={e => setDescription(e.target.value)} placeholder = "Describe your campaign here"/><br />
          Minimum Amount to contribute(ether):<br/> <input name = "minimumContribution" onChange={e => setMinimumContribution(e.target.value)} placeholder = "Enter Minimum Contribution Amount"/><br />
          Amount Required:<br /> <input name = "amountReq" onChange={e => setAmountReq(e.target.value)} placeholder = "Enter the amount require"/><br />
          <button type = "submit" id='createCampaign'>Create</button>
        </form>
        <span>
          {loading? <span>Loading Please Wait</span> : <span></span> }
          {error !== "" ? <span className = "errhandle">OOPS!!! <br/> {error}</span>: <span></span>}
        </span>
      </div>
      <Footer />
    </div>
  )
}
//0.001ether = 1000000000000000 wei
export default newCampaign;