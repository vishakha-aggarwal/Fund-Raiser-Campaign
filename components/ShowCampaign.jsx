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
  <div style={{minHeight: "90vh"}}>
    <div className='showCampaignHeading'>Campaign Details</div>
    <div className='showCampaignContainer'>
      <div><span className='showCamp'> Campaign Name</span> - {props.summary[5]}</div>
      <div><span className='showCamp'> Campaign Description</span> - {props.summary[6]}</div>
      <div><span className='showCamp'> Manager Address</span> - {props.summary[4]}</div>
      <div><span className='showCamp'> Deployed address</span> - {props.address}</div>
      <div><span className='showCamp'> Minimum contribution</span> - {web3.utils.fromWei(props.summary[0], 'ether')} ethers</div>
      <div><span className='showCamp'> Number of Requests</span> - {props.summary[2]}</div>
      <div><span className='showCamp'> Number of Contributers</span> - {props.summary[3]}</div>
      <div><span className='showCamp'> Current Balance</span> - {web3.utils.fromWei(props.summary[1], 'ether')} ethers</div>
      <div><span className='showCamp'> Amount Require</span> - {props.summary[7]} ethers</div>
      
      <Link route={`/campaigns/${props.address}/requests`}>
        <button className='showRequests'>
          Show All Requests
        </button>
      </Link>
      <hr />
      <form onSubmit={contribute}>
        <div style={{padding: "1vh"}}>Want to Contribute? Enter the amount(ether) </div > 
        <input onChange={e => setAmount(e.target.value)} placeholder = "Enter the amount of Ethers you want to contribute"></input><br />
        <button id = "donate">Donate!</button>
        {loading? <div>Loading Please Wait</div> : <span></span> }
        {error !== "" ? <div className='errhandle'>OOPS!!! <br/> {error}</div>: <span></span>}
      </form>
    </div>
  </div>
  )
}

export default ShowCampaign;