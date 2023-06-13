import React, { useState } from 'react'
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

function NewRequest() {

  let [value, setValue] = useState("");
  let [description, setDescription] = useState("");
  let [receipent, setReceipent] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  
  let submitForm = async (event) => {

    event.preventDefault();
    let currentURL = window.location.pathname;
    // console.log(currentURL);
    let address = currentURL.substring(11, 53);
    // console.log(address);
    
    const campaign = Campaign(address);
    setError('');
    
    document.getElementById("createReq").innerHTML = "Loading.. Please dont Click";
    setLoading(true);
    
    try {
        const accounts = await web3.eth.getAccounts();
        await campaign.methods
          .createRequest(description, web3.utils.toWei(value, 'ether'), receipent)
          .send({ from: accounts[0] });
  
        Router.pushRoute(`/campaigns/${address}/requests`);
      } catch (err) {
        setError(err.message);
      }

    setLoading(false);
    document.getElementById("createReq").innerHTML = "Create";
  }

  return (
    <div>
      <Header />
      <div className='showCampaignHeading'>Create Reqeust</div>

      <form onSubmit={submitForm} className = "newCampForm">
        Value(ether):<br /> <input name = "value" onChange={e => setValue(e.target.value)} placeholder="Enter the amount to be transferred"/><br />
        Description:<br />  <textarea name = "description" width = "400px" height= "100px" placeholder='Short description of the request' onChange={e => setDescription(e.target.value)} /><br />
        Receipent:<br />  <input name = "receipent" onChange={e => setReceipent(e.target.value)} placeholder="Account number of the receiver" /><br />
        <button type = "submit" id='createReq'>Create</button>
        {loading? <div>Loading Please Wait</div> : <span></span> }
        {error !== "" ? <div className='errhandle'>OOPS!!! <br/> {error}</div>: <span></span>}
      </form>
      <Footer />
    </div>
  )
}

export default NewRequest;