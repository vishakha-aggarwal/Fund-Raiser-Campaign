import React, { useEffect, useState } from 'react'
import AllCampaign from '../components/AllCampaign';
import factory from '../ethereum/campaignFactory';
import campaign from '../ethereum/campaign';
import { Link } from '../routes';
import Header from '../components/Header';
import Banner from '../components/Banner';
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
    <>
      <Header />
      <Banner />
      <div className='allCampaign'>
        <div className='homeHeading'>All Campaigns</div>
        {list && list.map((address, index) => {
            return <div key = {address}>{createCards(address, index)}</div>
        })}
      </div>
      <Footer />
    </>
  )
}

export default index