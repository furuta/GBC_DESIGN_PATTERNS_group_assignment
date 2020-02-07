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
- How much money people requested: mapping (address receiver => uint256).
- The amount of money to be paid: mapping ( address receiver => uint256 ).
- The amount of money that has already been paid for funders: mapping (address funders => uint256) 
- The people that funded the loan: mapping (address receiver=> address lender).
## Off-chain Data
- The reason for the loan. 
- {requester : address,reason: string}

## FUNCTIONS
## Actions:
- request(uint amount) public returns(bool);
- fund(address to) public payable returns(bool);
- payback() public payable returns(bool);

## Getters:
- getRequest(); 
- getLoanAmount(address receiver) public view;
- getLender(address receiver) public view;

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
