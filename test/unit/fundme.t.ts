import { assert, expect } from "chai";
import hre, { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { TypedContractMethod } from "../../typechain-types/common";
import { FundMe } from "../../typechain-types";

import {time,mine} from "@nomicfoundation/hardhat-network-helpers"
import { Deployment } from "hardhat-deploy/dist/types";
import { devlopmentChains } from "../../config";

!devlopmentChains.includes(network.name)
? describe.skip
: describe("test fundme contract", async function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let fundme: FundMe; 
  let fundMeSecondAccount:FundMe;
  let firstAccount: string;
  let secondAccount: string;
  let mockV3Aggregator: Deployment;

  this.beforeEach(async ()=>{
    await deployments.fixture();
    firstAccount = (await getNamedAccounts()).firstAccount;
    secondAccount = (await getNamedAccounts()).secondAccount;
    const fundmeDeployment = await deployments.get("FundMe");

    mockV3Aggregator = await deployments.get("MockV3Aggregator");
    fundme = await ethers.getContractAt("FundMe",fundmeDeployment.address);
    fundMeSecondAccount = await ethers.getContract("FundMe",secondAccount);
  })

  it("test if owner is msg.shender",async ()=>{
    (await fundme).waitForDeployment();
    const owner: TypedContractMethod<[], [string], "view"> = (await fundme).owner;
    assert.equal(await owner(),firstAccount)
  })

  it("test if dataFeed  ",async ()=>{
    (await fundme).waitForDeployment();
    const dataFeed = (await fundme).dataFeed;
    assert.equal(await dataFeed(),mockV3Aggregator.address)
  })

  // fund, getFund, refund
  // unit test for fund
  // window open, value greater then minimum value, funder balance
  it("window closed, value grater than minimum, fund failed", 
    async function() {
        // make sure the window is closed
        await time.increase(200)
        await mine()
        //value is greater minimum value
        await expect(fundme.fund({value: ethers.parseEther("0.1")}))
            .to.be.revertedWith("windoiws is closed!!")
    }
  )

  it("window open, value is less than minimum, fund failed", 
    async function() {
        //value is greater minimum value
        await expect(fundme.fund({value: ethers.parseEther("0.01")}))
            .to.be.revertedWith("send more eth")
    }
  )

  it("window open, value is grater than minimum, fund success!", 
    async function() {
      await fundme.fund({value: ethers.parseEther("0.1")})
      const balance = await fundme.fundersToAmount(firstAccount)
      expect(balance).to.equal(ethers.parseEther("0.1"))
    }
  )

  /*
    1. OnlyOwner
    2. WindowsIsCosed
    3. Target is not reached
  */

  it("not owner, window is closed, targe reached ,getfund failed!", 
    async function() {
      // make sure the targe is reached;
      await fundme.fund({value: ethers.parseEther("1")})

      // make sure the window is closed
      await time.increase(200)
      await mine()
      
      // 
      expect(fundMeSecondAccount.getFund()).to.be.revertedWith("this function can only be called by owner")
    }
  )

  it("window open, targe reached ,getfund failed!", 
    async function() {
      // make sure the targe is reached;
      await fundme.fund({value: ethers.parseEther("1")})
      expect(fundme.getFund()).to.be.revertedWith("windows is not closed!!")
    }
  )

  it("window is closed, targe is not reached ,getfund failed!", 
    async function() {
      await fundme.fund({value: ethers.parseEther("0.1")})
      // make sure the window is closed
      await time.increase(200)
      await mine()
      expect(fundme.getFund()).to.be.revertedWith("Target is not reached")
    }
  )

  it("window is closed, targe is reached ,getfund failed!", 
    async function() {
      await fundme.fund({value: ethers.parseEther("0.1")})
      // make sure the window is closed
      await time.increase(200)
      await mine()
      expect(fundme.getFund()).to.be.revertedWith("Target is not reached")
    }
  )

  it("window is closed, targe is reached ,getfund success!", 
    async function() {
      await fundme.fund({value: ethers.parseEther("1")})
      // make sure the window is closed
      await time.increase(200)
      await mine()
      await expect(fundme.getFund()).to.emit(fundme,"FundWithdrawByOwner").withArgs(ethers.parseEther("1"))
    }
  )



  // refund

  it("[refund1]: window open, target is not reached ,fender has banalce!", 
    async function() {
      await fundme.fund({value: ethers.parseEther("0.1")})
      await expect(fundme.reFund()).to.be.revertedWith("windows is not closed!!")
    }
  )

  it("[refund2]: window closed, target reach, funder has balance", 
    async function() {
      await fundme.fund({value: ethers.parseEther("1")})
      // make sure the window is closed
      await time.increase(200)
      await mine()
      await expect(fundme.reFund()).to.be.revertedWith("Target is reached")
    }
  )


  it("[refund3]: window closed, target not reach, funder does not has balance", 
    async function() {
      // target is reached 
      await fundme.fund({value: ethers.parseEther("0.1")})
      // make sure the window is closed
      await time.increase(200)
      await mine()
      await expect(fundMeSecondAccount.reFund())
          .to.be.revertedWith("there is no fund for you");
    }
  )

  it("[refund4]: window closed, target not reached, funder has balance", 
    async function() {
      await fundme.fund({value: ethers.parseEther("0.1")})
      // make sure the window is closed
      await time.increase(200)
      await mine()
      await expect(fundme.reFund())
        .to.emit(fundme,"RefundByFunder")
        .withArgs(firstAccount,ethers.parseEther("0.1"))
    }
  )





});
