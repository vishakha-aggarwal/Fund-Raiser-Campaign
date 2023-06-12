import React from 'react'
import { Link } from '../routes';
import web3 from '../ethereum/web3';


function AllCampaign(props) {

  return (
    <div className='box'>
        {/* <div>Deployed address{props.address}</div> */}
        <div><span className='campaignTitle'>Campaign Name - </span>{props.summary[5]}</div>
        <div><span className='campaignTitle'>Campaign Description - </span>{props.summary[6]}</div>
        {/* <div><span className='campaignTitle'>Manager Address - </span>{props.summary[4]}</div> */}
        <div><span className='campaignTitle'>Number of Requests - </span>{props.summary[2]}</div>
        <div><span className='campaignTitle'>Number of Contributers - </span>{props.summary[3]}</div>
        <div><span className='campaignTitle'>Current Balance - </span>{web3.utils.fromWei(props.summary[1], 'ether')} ethers</div> 
        <Link route={`/campaigns/${props.address}`}>
          <button className='viewCampaign'>
            View Campaign
          </button>
        </Link>
    </div>
  )
}

export default AllCampaign;