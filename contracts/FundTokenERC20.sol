// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

import {FundMe} from './FundMe.sol';


// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract FundTokenERC20 is ERC20,ERC20Permit {
    FundMe fundMe;
    constructor(address _fundMeAddress) ERC20("fundMe", "FM") ERC20Permit("fundMe") {
        fundMe = FundMe(_fundMeAddress);
    }

    function mint(uint256 amountToMint) public {
        require(fundMe.fundersToAmount(msg.sender) >= amountToMint,"you can not mint!");
        require(fundMe.getFundSuccess(),"you can not mint!");
        
        _mint(msg.sender, amountToMint);
        fundMe.setFundersToAmount(
            msg.sender,
            fundMe.fundersToAmount(msg.sender) - amountToMint);
    }

    function claim(uint256 amountToClaim) public {
        require(balanceOf(msg.sender)>= amountToClaim,"dont enough ERC20") ;
        require(fundMe.getFundSuccess(),"you can not mint!");
        _burn(msg.sender,amountToClaim);
    }
    
}
