// contracts/MyContract.sol
pragma solidity ^0.8.0;

contract MyContract {
    uint256 public myNumber;
    string public myString;

    constructor(uint256 initialNumber, string memory initialString) {
        myNumber = initialNumber;
        myString = initialString;
    }

    function getNumber() public view returns (uint256) {
        return myNumber;
    }

    function getString() public view returns (string memory) {
        return myString;
    }

    function setNumber(uint256 newNumber) public {
        myNumber = newNumber;
    }

    function setString(string memory newString) public {
        myString = newString;
    }
}