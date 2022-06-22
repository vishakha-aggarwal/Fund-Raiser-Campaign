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

  let renderTohome = () => {
    Router.pushRoute('/')
  }
  
  return ( 
  <div>
    <button className='home' onClick={renderTohome}> Back to Home</button>
    <div className='showCampaignContainer'>
        <div>Campaign Name - {props.summary[5]}</div>
        <div>Campaign Description - {props.summary[6]}</div>
        <div>Manager Address - {props.summary[4]}</div>
        <div>Deployed address - {props.address}</div>
        <div>Minimum contribution(ether) - {web3.utils.fromWei(props.summary[0], 'ether')}</div>
        <div>Number of Requests - {props.summary[2]}</div>
        <div>Number of Contributers - {props.summary[3]}</div>
        <div>Curr Balance:(ether) - {web3.utils.fromWei(props.summary[1], 'ether')}</div>
        <div>Amount Require - {props.summary[7]}</div>
        <div style = {{fontSize: "18px", fontStyle: "italic", border: "1px solid grey", backgroundColor: "lightblue", width: "200px", margin: "5px", padding: "10px", borderRadius : "10px"}}>
        <Link route={`/campaigns/${props.address}/requests`}><a>Show All Requests</a></Link>
        </div>
        <hr />
        <form onSubmit={contribute}>
          <div>Want to Contribute ? </div>
          Enter the amount(ether) <br /> <input onChange={e => setAmount(e.target.value)} placeholder = "Enter the amount of Ethers you want to contribute"></input><br />
          <button id = "donate">Donate!</button>
          {loading? <div>Loading Please Wait</div> : <span></span> }
          {error !== "" ? <div className='errhandle'>OOPS!!! <br/> {error}</div>: <span></span>}
        </form>
    </div>
  </div>
  )
}

export default ShowCampaign;