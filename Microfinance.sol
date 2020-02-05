pragma solidity ^0.5.9;
import "github.com/OpenZeppelin/zeppelin-solidity/contracts/math/SafeMath.sol";

contract MicroFinance {
    
    using SafeMath for uint;
     
    struct Loaner{
        uint loan;
    }
    struct Lenders{
        address Loaner;
    }
    // mapping(key_type => value_type)
    mapping(address => Loaner) loaners;
    mapping(address => Lenders) lenders;
    address[] public loanerAccts;
    address[] public lenderAccts;

    function setLoaner(address _address, uint _loan) public {
        require(_loan <= 2 ether, "Max 2 ethers");
        require(_address != address(0), "address is zero address");
        Loaner storage loaner = loaners[_address];
        loaner.loan = _loan + 0.02 ether;
        loanerAccts.push(_address);
    }
    
    function getLoaners() public view returns(address [] memory){
        return loanerAccts;
    }
    
    function getLoaner(address _loaner) public view returns(uint) {
        require(_loaner != address(0), "address is zero address");
        return (loaners[_loaner].loan);
        
    }
    function payLoan(address _loaner, uint _pay) public payable {
        loaners[_loaner].loan.sub(_pay);
    }
    
    function countLoaner() public view returns(uint){
        return loanerAccts.length;
    }
    
    function setLender(address _address, address _loaner) public {
        require(_address != address(0), "address is zero address");
        Lenders storage lender = lenders[_address];
        lender.Loaner = _loaner;
        lenderAccts.push(_address);
    }
    function getLender() public view returns(address [] memory){
        return lenderAccts;
    }
    function getLendersLoan(address _lender) public view returns(address) {
        require(_lender != address(0), "address is zero address");
        return (lenders[_lender].Loaner);
        
    }
    function countLender() public view returns(uint){
        return lenderAccts.length;
    }
    
}