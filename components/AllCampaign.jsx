import React from 'react'
import { Link } from '../routes';
import web3 from '../ethereum/web3';


function AllCampaign(props) {

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
        <Link route={`/campaigns/${props.address}`}><a>View Campaign</a></Link>
        </div>
        <hr />
    </div>
  )
}

export default AllCampaign;