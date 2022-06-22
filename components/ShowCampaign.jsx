import React, { useState } from 'react';
import { Link } from '../routes';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

function ShowCampaign(props) {

  let [loading, setLoading] = useState(false);
  let [amount, setAmount] = useState("");
  let [error, setError] = useState("");

  let contribute = async(event) => {
    
    event.preventDefault();

    const campaign = Campaign(props.address);
    setLoading(true);
    setError("");
    document.getElementById("donate").innerHTML = "Loading!!";

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, 'ether')
      });
      Router.replaceRoute(`/campaigns/${props.address}`);
    } catch (err) {
      setError(err.message);
    }
    document.getElementById("donate").innerHTML = "Donate";
    setLoading(false);
  }
  
  return (
    <div>
        <hr />
        <div>Deployed address{props.address}</div>
        <div>Manager Address {props.summary[4]}</div>
        <div>Campaign Name {props.summary[5]}</div>
        <div>Campaign Description {props.summary[6]}</div>
        <div>Minimum contribution(ether): {web3.utils.fromWei(props.summary[0], 'ether')}</div>
        <div>Number of Requests {props.summary[2]}</div>
        <div>Number of Contributers {props.summary[3]}</div>
        <div>Curr Balance:(ether):  {web3.utils.fromWei(props.summary[1], 'ether')}</div>
        <div>Amount Require {props.summary[7]}</div>
        <div>Link 
        <Link route={`/campaigns/${props.address}/requests`}><a>Show Requests</a></Link>
        </div>
        <form onSubmit={contribute}>
          Enter the amount(ether): <input onChange={e => setAmount(e.target.value)}></input><br />
          <button id = "donate">Donate!</button>
          {loading? <div>Loading Please Wait</div> : <span></span> }
          {error !== "" ? <div>OOPS!!! <br/> {error}</div>: <span></span>}
        </form>
        <hr />
    </div>
  )
}

export default ShowCampaign;