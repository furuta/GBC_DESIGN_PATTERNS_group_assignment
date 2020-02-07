pragma solidity ^0.5.9;
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

contract MicroFinance {
    
    using SafeMath for uint;
     
    struct Loaner{
        uint loan;
    }
    struct Request {
        uint value;
        bool status;
    }
    struct Lenders{
        address Loaner;
        uint amount;
    }
    // mapping(key_type => value_type)
    mapping(address => Request) requested;
    mapping(address => uint) loanerWallet;
    mapping(address => uint) lenderWallet;
    // mapping(address => Lenders) lenders;
    mapping(address => address) loaners;
    // mapping(uint => lenders) amountLended;
    // address[] public loanerAccts;
    // address[] public lenderAccts;
    
    function loanRequest(uint loan) public {
        bool isExistedRequest = requested[msg.sender].status;
        require( isExistedRequest == false,"already requested");
        Request memory request = Request(loan,true);
        requested[msg.sender] = request;
    }
    function fund(address to) public payable{
        uint money = requested[to].value;
        require(money == msg.value,"not enough fund");
        bool fundStatus = requested[to].status;
        require(fundStatus == true,"already had money");
        loanerWallet[to] = msg.value;
        loaners[to] = msg.sender;
        requested[to].status = false;
    }
    function getMoneyRequested(address to) public view returns(uint){
        return requested[to].value;
    }
    function getStatusRequested(address to) public view returns(bool){
        return requested[to].status;
    }
    function payBack() public payable{
        uint money = requested[msg.sender].value;
        require(money.add(0.02 ether)==msg.value,"not enough money");
        address lenderAddr = loaners[msg.sender];
        lenderWallet[lenderAddr] += money.add(0.02 ether);
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
        address payable receiver = msg.sender;
        uint money = loanerWallet[receiver];
        require(money != 0,"nothing to withdraw");
        loanerWallet[receiver] = 0;
        receiver.transfer(money);
    }   
}