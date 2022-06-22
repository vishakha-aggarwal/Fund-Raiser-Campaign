import React, { useEffect, useState } from 'react'
import AllCampaign from '../components/AllCampaign';
import factory from '../ethereum/campaignFactory';
import campaign from '../ethereum/campaign';
// import CreateCampaign from '../components/CreateCampaign'
import { Link } from '../routes';

function index() {
  
  let [summary, setSummary] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);
  
  const getList = async() => {
    let result = await factory.methods.getDeployedCampaigns().call();
    setList(result);
    result.map(address => getSumm(address));
  }

  const getSumm = async(address) => {

      let result = await campaign(address).methods.getSummary().call();
      
      setSummary((oldSumm) => {
        return [...oldSumm, result];
      })
  }

  function createCards(address, index)
  {
    let summ = summary[index];
    
    console.log(summ);
    if(summ !== undefined)  { 
      return <AllCampaign address = {address} summary = {summ} index = {index}/>
        
    }
  }
  
  return (
    <div>
      <Link route="/campaigns/new">
        <a><button>Create</button></a>
      </Link>
      <h3> Open Campaigns </h3>
      {list.map((address, index) => {
          return <div key = {address}>{createCards(address, index)}</div>
          // return <div key={address}>{address}</div>
       })}
    </div>
  )
}

export default index