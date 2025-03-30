import { assert, expect } from "chai";
import hre, { deployments, ethers, getNamedAccounts } from "hardhat";
import { TypedContractMethod } from "../typechain-types/common";
import { FundMe } from "../typechain-types";


describe("test fundme contract", async function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let fundme: FundMe;
  let firstAccount: string;

  this.beforeAll(async ()=>{
    await deployments.fixture();
    firstAccount = (await getNamedAccounts()).firstAccount;
    const fundmeDeployment = await deployments.get("FundMe");
    fundme = await ethers.getContractAt("FundMe",fundmeDeployment.address)
  })

  it("test if owner is msg.shender",async ()=>{
    (await fundme).waitForDeployment();
    const owner: TypedContractMethod<[], [string], "view"> = (await fundme).owner;
    assert.equal(await owner(),firstAccount)
  })

  it("test if dataFeed is 0x694AA1769357215DE4FAC081bf1f309aDC325306",async ()=>{
    (await fundme).waitForDeployment();
    const dataFeed = (await fundme).dataFeed;
    assert.equal(await dataFeed(),"0x694AA1769357215DE4FAC081bf1f309aDC325306")
  })
});
