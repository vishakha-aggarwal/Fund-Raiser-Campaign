import React, { useEffect, useState } from 'react'
import Campaign from '../../../ethereum/campaign'
import ShowRequest from '../../../components/ShowRequest';
import { Link } from '../../../routes';

function index() {

    let [address, setAddress] = useState("");
    let [requests, setRequests] = useState([]);
    let campaign; 
    let [requestCount, setCount] = useState(0);
    let contributersCount;
    
    useEffect(() => {

        let currentURL = window.location.pathname;
        let add = currentURL.substring(11, 53);
        console.log(add);
        setAddress(add);
        campaign = Campaign(add);
        getDetails();
    },[])

    const getDetails = async ()=> {
        let count = await campaign.methods.getRequestsCount().call();
        setCount(count);

        for(let idx = 0; idx < count; idx++)
            getReq(idx);        
    }

    const getReq = async (index)=> {
        
        let result = await campaign.methods.requests(index).call();
        setRequests((oldReq) => {
            return [...oldReq, result];
        })
    }

    return (
    <div>
        {address !== undefined? 
        <Link route={`/campaigns/${address}/requests/new`}>
            <a><button>Create new request</button></a>
        </Link> : <span></span>}
        <div>These are all the requests</div>
        {requests.map((req, index) => {
            // console.log(req);
            return <div><ShowRequest key = {index} details = {req} index = {index} address = {address}/></div>
        })}
        <div>Total Requests: {requestCount}</div>
        <hr />
    </div>
  )
}

export default index