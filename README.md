# GBC_DESIGN_PATTERNS_group_assignment
For the task of DESIGN PATTERNS FOR BLOCKCHAIN at GBC

## Team
34ASIAN

## Members:
- Nguyen Anh Tuan Dinh
- Lobsang Tenzin
- Tomohiro Furuta
- Andres Ponton

## Architectural Doc.
## GOAL
Creating a platform where funders can give out loans which are not worth the cost of traditional auditing for receivers without intermediary. Through the platform, students can pay for tuition, impoverished people can start their own business and copy emergency cases.

## DATA
## On-chain Data
- People can request for a loan: mapping(address => Request) requested;
- Wallet of the people getting the loan and recieve funds: mapping(address => uint) loanerWallet;
- Wallet of the funder to recieve funds: mapping(address => uint) lenderWallet; 
- To track the adress of loaners: mapping(address => mapping(address => uint)) loaners;
- To keep track of how many people has been funded by an address: mapping(address => address[]) fundedPeople;
- To keep track which address still owes money: mapping(address => address[]) debtors;
- To track how many people has a lender funded:  address[] public lenderAccts;

## Off-chain Data
- The reason for the loan. 
- {requester : address,reason: string}

## FUNCTIONS
## Actions:
- loanRequest(uint loan) public;
- changeLoanRequestStatus() public;
- fund(address to) public payable;
- payBack(address to) public payable;
- withDrawLenders() public;
- withDrawLoaners() public;

## Getters:
- getLoanRequestStatus() public view returns(bool); 
- getRequestedValue(address to) public view returns(uint);
- getFundedValue(address to) public view returns(uint);
- getStatusRequested(address to) public view returns(bool);
- getFundedPeople() public view returns(address[] memory);
- getDebtors() public view returns(address[] memory);
- getLenderWallet() public view returns(uint);
- getLoannerWallet() public view returns(uint);
- countLender() public view returns(uint);

## FLOWCHART
- Receiver create request
- Funder check what requests are there now
- Funder fund to a request
- Receiver payback the loan
- The money and interest is transferred to the funder

## TYPE OF ARCHITECT
- Hybrid 

- Project Plan.
- List of tasks
- Front-end
- Back-end
- Smart Contract
- Testing

## Time estimations:
- Front-end :  2 days.
- Back-end: 1 day.
- Smart Contract: 3 days.
- Testing: 1 day.

## Staffing.
- Front-end : Nguyen Anh Tuan Dinh.
- Back-end: Lobsang Tenzin.
- Smart Contract: Tomohiro Furuta
- Testing: Andres Ponton. 

## Dependencies.
- Smart Contract, Front-end, and Back-end are implementing asynchronously.
- Testing after each task is completed.
- Combining all the parts when they are finished testing.
