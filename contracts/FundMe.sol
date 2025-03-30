// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// 1. 创建一个收款函数
// 2. 记录投资人并且查看
// 3. 在锁定期内，达到目标值，生产商可以提款
// 4. 在锁定期内，没有达到目标值，投资人在锁定期以后退款

//

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract FundMe {

    mapping(address=>uint256) public fundersToAmount;

    AggregatorV3Interface public dataFeed;

    uint256 MIN_PRICE = 100 * 10**18;
    uint256 constant TARGET_VALUE = 1000 * 10**18;
    address public owner;
    uint256 deploymentTiemstamp;
    uint256 lockTime;

    address ERC20Addr;

    bool public getFundSuccess = false;


    modifier WindowsIsCosed() {
         require(block.timestamp >= deploymentTiemstamp + lockTime,"not closed!!");
        _;
    }

    modifier OnlyOwner() {
         require(msg.sender == owner,"called by owner!");
        _;
    }

    constructor(uint256 _locktime){
        dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        owner = msg.sender;
        deploymentTiemstamp = block.timestamp;
        lockTime = _locktime;
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }

    function convertEthToUsd(uint256 ethAmount) internal view returns(uint256){
        uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
        return ethAmount * ethPrice / (10 ** 8);
    }

    function taransferOwnership(address newOwner) external OnlyOwner {
        owner = newOwner;
    }


    function fund() external payable {
        require(block.timestamp < deploymentTiemstamp + lockTime,"closed!!");
        require(convertEthToUsd(msg.value) >= MIN_PRICE,"send more eth");
        fundersToAmount[msg.sender] = msg.value;
    }

    function  getFund() external payable WindowsIsCosed OnlyOwner{
        require(convertEthToUsd(address(this).balance) >= TARGET_VALUE,"Target is not reached");
        payable(msg.sender).transfer(address(this).balance);
        fundersToAmount[msg.sender] = 0; 
        getFundSuccess = true;
    }

    function reFund() external WindowsIsCosed{
        require(convertEthToUsd(address(this).balance) < TARGET_VALUE,"Target is not reached");
        require(fundersToAmount[msg.sender] != 0,"0");
        bool success;
        (success,) = payable(msg.sender).call{value: fundersToAmount[msg.sender]}("");
        require(success,"failed");
        fundersToAmount[msg.sender] = 0;
    }

    function setFundersToAmount(address funder,uint256 _amount) external {
        require(msg.sender == ERC20Addr,"you do not permission to call this function");
        fundersToAmount[funder] = _amount;
    }
    function setERC20Addr(address _rec20address) external OnlyOwner{
        ERC20Addr = _rec20address;
    }
} 