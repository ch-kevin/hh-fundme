import { assert, expect } from "chai";
import hre, { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { TypedContractMethod } from "../../typechain-types/common";
import { FundMe } from "../../typechain-types";
import { devlopmentChains } from "../../config";


devlopmentChains.includes(network.name)
? describe.skip
: describe("test fundme contract", async function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let fundme: FundMe; 
  let firstAccount: string;

  this.beforeEach(async ()=>{
    await deployments.fixture();
    firstAccount = (await getNamedAccounts()).firstAccount;
    const fundmeDeployment = await deployments.get("FundMe");
    fundme = await ethers.getContractAt("FundMe",fundmeDeployment.address); 
  })
  
  it("fund and getfund successfully",async ()=>{
    // make sure target reached; 
    await fundme.fund({value: ethers.parseEther("0.5")})
    // make sure window is closed;
    await new Promise(resolve => setTimeout(resolve,181 * 1000))
    // make sure we can get receipt;

    const getfundtx = await fundme.getFund();
    const gerfundReceipt = getfundtx.wait();
    expect(gerfundReceipt)
        .to.be.emit(fundme,"FundWithdrawByOwner")
        .withArgs(ethers.parseEther("0.5"))
  })

  it("fund and refund successfully",async ()=>{
    // make sure target reached; 
    await fundme.fund({value: ethers.parseEther("0.1")})
    // make sure window is closed;
    await new Promise(resolve => setTimeout(resolve,181 * 1000))
    // make sure we can get receipt;

    const refundtx = await fundme.reFund();
    const refundReceipt = refundtx.wait();
    expect(refundReceipt)
        .to.be.emit(fundme,"FundWithdrawByOwner")
        .withArgs(firstAccount,ethers.parseEther("0.1"))
  })

});
