import React, { useState } from 'react'
import { Link } from '../routes';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

function ShowRequest(props) {
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");

    let details = props.details;
    if (details === undefined)
        return;
    let index = props.index + 1;
    // console.log(details);

    let approveReq = async () => {

        setLoading(true);
        setError("");
        document.getElementById("approve").innerHTML = "Loading!!";

        try {
            const campaign = Campaign(props.address);

            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(index - 1).send({
                from: accounts[0]
            });
            // Router.replaceRoute(`/campaigns/${props.address}/requests`);
            // console.log(`/campaigns/${props.address}/requests`);
            
        } catch (err) {
            setError(err.message);
        }
        document.getElementById("approve").innerHTML = "Approve Request";
        setLoading(false);
    }

    let finalReq = async () => {

        setLoading(true);
        setError("");
        document.getElementById("finalize").innerHTML = "Loading!!";

        try {
        const campaign = Campaign(props.address);

        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeTransaction(index - 1).send({
            from: accounts[0]
        });

        // console.log(`/campaigns/${props.address}/requests`);
        } catch (err) {
            setError(err.message);
        }
        document.getElementById("finalize").innerHTML = "Finalize Request";
        setLoading(false);
    }

    return (
        <div className='box' style={{width: "100%"}}>
            <div><span className='campaignTitle'> Request {index}: </span></div>
            <div><span className='campaignTitle'> Description - </span>{details[0]} </div>
            <div><span className='campaignTitle'> Value to be transferred - </span>{web3.utils.fromWei(details[1], 'ether')} ether</div>
            <div><span className='campaignTitle'> To Account - </span>{details[2]}</div>
            <div><span className='campaignTitle'> Number of Approvals - </span>{details[4]}</div>
            <div><span className='campaignTitle'> Completed status - </span>{details[3] ? <span>True</span> : <span>False</span>}</div>
            {details[3] !== true ? (
            <div>
                <button onClick={approveReq} id = "approve">Approve Request</button>
                <button onClick={finalReq} id = "finalize">Finalize Request</button>
            </div>) : <span></span>}
            {loading? <div>Loading Please Wait</div> : <span></span> }
            {error !== "" ? <div className='errhandle'>OOPS!!! <br/> {error}</div>: <span></span>}
        </div>
    )
}

export default ShowRequest;