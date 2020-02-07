pragma solidity ^0.5.9;
import '@openzeppelin/contracts/math/SafeMath.sol';

contract MicroFinance {
    
    using SafeMath for uint;
     
    struct Loaner{
        uint loan;
    }
    struct Request {
        uint value;
        uint fundedValue;
        bool status;
    }
    mapping(address => Request) requested;
    mapping(address => uint) loanerWallet;
    mapping(address => uint) lenderWallet;
    mapping(address => mapping(address => uint)) loaners;
    address[] public lenderAccts;
    
    function loanRequest(uint loan) public {
        require(loan <= 2 ether,'');
        require(requested[msg.sender].fundedValue == 0, 'you have to pay at first');
        
        requested[msg.sender] = Request(loan ,0 ,true);
    }
    function changeLoanRequestStatus() public {
        require(requested[msg.sender].value > 0, 'There is no request');
        requested[msg.sender].status = !requested[msg.sender].status;
    }
    function getLoanRequestStatus() public view returns(bool) {
        return requested[msg.sender].status;
    }
    function fund(address to) public payable{
        require(msg.value > 0, '0 value');
        require((requested[to].value - requested[to].fundedValue) >= msg.value,"not enough fund");
        require(requested[to].status == true,"the request do not except any more");
        
        loanerWallet[to] = loanerWallet[to].add(msg.value);
        requested[to].fundedValue = requested[to].fundedValue.add(msg.value);
        loaners[to][msg.sender] = loaners[to][msg.sender].add(msg.value);
        lenderAccts.push(msg.sender);
    }
    function getRequestedValue(address to) public view returns(uint){
        return requested[to].value;
    }
    function getFundedValue(address to) public view returns(uint){
        return requested[to].fundedValue;
    }
    function getStatusRequested(address to) public view returns(bool){
        return requested[to].status;
    }
    function payBack(address to) public payable{
        uint money = loaners[msg.sender][to];
        require(loaners[msg.sender][to].div(100).mul(2).add(money) >= msg.value,"not enough money");

        loaners[msg.sender][to] = loaners[msg.sender][to].sub(msg.value);
        lenderWallet[to] = lenderWallet[to].add(msg.value);
        requested[msg.sender].fundedValue = requested[msg.sender].fundedValue.sub(msg.value);
    }
    function getLenderWallet() public view returns(uint){
        return lenderWallet[msg.sender];
    }
    function getLoannerWallet() public view returns(uint){
        return loanerWallet[msg.sender];
    }
    function withDrawLenders() public {
        address payable receiver = msg.sender;
        uint money = lenderWallet[receiver];
        require(money != 0,"nothing to withdraw");
        lenderWallet[receiver] = 0;
        receiver.transfer(money);
    }
    function withDrawLoaners() public {
        require(requested[msg.sender].status == false, 'change status to false to withdraw the money');
        address payable receiver = msg.sender;
        uint money = loanerWallet[receiver];
        require(money != 0,"nothing to withdraw");
        loanerWallet[receiver] = 0;
        receiver.transfer(money);
    }
    function countLender() public view returns(uint) {
        return lenderAccts.length;
    }
}