pragma solidity ^0.4.17;

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign (uint minimum, string name, string description, uint amountRequire) public {
        address newCampaign = new Campaign(minimum, msg.sender, name, description, amountRequire);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    uint public minimumContribution;
    address public manager;
    string public campaignName;
    string public campaignDescription;
    mapping(address => bool) public contributers;
    mapping(address => bool) public approvers;
    uint contributersCount;
    uint public amountRequire;
    uint public currAmount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum, address managerAddress, string name, string description, uint amountReq) public {
        minimumContribution = minimum;
        manager = managerAddress;
        campaignName = name;
        campaignDescription = description;
        currAmount = 0;
        amountRequire = amountReq;
    }

    function contribute() public payable {
        
        require(msg.value >= minimumContribution);
        if(contributers[msg.sender] == false)
            contributersCount++;
        contributers[msg.sender] = true;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public{

        require(contributers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);
        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeTransaction(uint index) public restricted {

        require(requests[index].approvalCount >= (contributersCount / 2));
        require(!requests[index].complete);

        requests[index].recipient.transfer(requests[index].value);
        requests[index].complete = true;
    } 

    function getbalance() public view returns(uint) {
        return this.balance;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address, string, string, uint) {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            contributersCount,
            manager,
            campaignName,
            campaignDescription,
            amountRequire
        );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
}