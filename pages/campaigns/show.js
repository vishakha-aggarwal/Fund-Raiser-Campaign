import React, { useEffect, useState } from 'react'
import { Link } from '../../routes';
import { useLocation } from 'react-router-dom';
import campaign from "../../ethereum/campaign";
import factory from "../../ethereum/campaignFactory";
import ShowCampaign from '../../components/ShowCampaign'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Router } from '../../routes';


function show() {

  let [summary, setSummary] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    getSumm();
  }, []);
  
  let address;
  const getSumm = async () => {

    let currentURL = window.location.pathname;
    // console.log(currentURL);
    address = currentURL.substring(11, 53);

    let result = await campaign(address).methods.getSummary().call();

    setSummary((oldSumm) => {
      return [...oldSumm, result];
    })
  }


  function createCard(summ, index) {
    
    let currentURL = window.location.pathname;
    // console.log(currentURL);
    address = currentURL.substring(11);
    // console.log("showing summary");
    // console.log(summ);
    if(summ !== undefined)  { 
      return <ShowCampaign address = {address} summary = {summ} index = {index}/>
        
    }  }

  return (
    <div>
      <Header />
      {summary.map((summ, index) => {
        
          return <div key = {address}>{createCard(summ, index)}</div>
          // return <div key={address}>{address}</div>
       })}
       <Footer />
    </div>
  )
}

export default show