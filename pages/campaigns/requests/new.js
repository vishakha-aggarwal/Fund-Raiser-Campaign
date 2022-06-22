import React, { useState } from 'react'
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

function NewRequest() {

  let [value, setValue] = useState("");
  let [description, setDescription] = useState("");
  let [receipent, setReceipent] = useState("");
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  
  let submitForm = async (event) => {

    event.preventDefault();
    let currentURL = window.location.pathname;
    console.log(currentURL);
    let address = currentURL.substring(11, 53);
    console.log(address);
    
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
      <div>Create a new reqeust</div>
      <form onSubmit={submitForm}>
        Value(ether): <input name = "value" onChange={e => setValue(e.target.value)} /><br />
        Description: <input name = "description" onChange={e => setDescription(e.target.value)} /><br />
        Receipent: <input name = "receipent" onChange={e => setReceipent(e.target.value)} /><br />
        <button type = "submit" id='createReq'>Create</button>
      </form>
      {loading? <div>Loading Please Wait</div> : <span></span> }
      {error !== "" ? <div>OOPS!!! <br/> {error}</div>: <span></span>}
    </div>
  )
}

export default NewRequest;