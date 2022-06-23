import React, { useEffect, useState } from 'react'
import AllCampaign from '../components/AllCampaign';
import factory from '../ethereum/campaignFactory';
import campaign from '../ethereum/campaign';
// import CreateCampaign from '../components/CreateCampaign'
import { Link } from '../routes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Router } from '../routes';


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
      let obj = {
        address: address,
        result: result
      }
      setSummary((oldSumm) => {
        return [...oldSumm, obj];
      })
  }

  function createCards(address, index)
  {
    let summ = summary.find(ele => ele.address === address);
    // let summ = summary[index];
    // console.log(summ);
    if(summ !== undefined)  { 
      // console.log(summ);
      let add = summ.address;
      let result = summ.result;
      // console.log(add);
      // console.log(result);
      return <AllCampaign address = {add} summary = {result} index = {index}/>
        
    }
  }
  
  return (
    <div>
      <Header />
      <div className='container'>
      <Link route="/campaigns/new">
        <a><button className='createCampaign'>Create</button></a>
      </Link>
      <h3> Open Campaigns </h3>
      {list.map((address, index) => {
          return <div key = {address}>{createCards(address, index)}</div>
          // return <div key={address}>{address}</div>
       })}
       </div>
       <Footer />
    </div>
  )
}

export default index