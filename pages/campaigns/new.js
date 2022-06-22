import React, { useState } from 'react'
import campaignFactory from '../../ethereum/campaignFactory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

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
      let minamount = web3.utils.toWei(minimumContribution, 'ether');
      await campaignFactory.methods.createCampaign(minamount, campaignName, description, amountReq)
        .send({
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
      <div>Create a new campaign</div>
      <form onSubmit={submitForm}>
        Campaign Name: <input name = "campaignName" onChange={e => setCampaignName(e.target.value)} /><br />
        Description: <input name = "description" onChange={e => setDescription(e.target.value)} /><br />
        Minimum Amount to contribute(ether): <input name = "minimumContribution" onChange={e => setMinimumContribution(e.target.value)} /><br />
        Amount Required: <input name = "amountReq" onChange={e => setAmountReq(e.target.value)} /><br />
        <button type = "submit" id='createCampaign'>Create</button>
      </form>
      {loading? <div>Loading Please Wait</div> : <span></span> }
      {error !== "" ? <div>OOPS!!! <br/> {error}</div>: <span></span>}
    </div>
  )
}
//0.001ether = 1000000000000000 wei
export default newCampaign;