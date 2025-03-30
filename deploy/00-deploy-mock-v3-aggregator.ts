import { DeployFunction } from "hardhat-deploy/dist/types"
import { DECIMAL, devlopmentChains, INITIAL_ASNWER } from "../config";
import { network } from "hardhat";

const main: DeployFunction = async ({
    getNamedAccounts,
    deployments,
    // getChainId,
    // getUnnamedAccounts,
  })=>{
    
    if(devlopmentChains.includes(network.name)){
      const {firstAccount} = await getNamedAccounts()
      const {deploy} = deployments
      await deploy("MockV3Aggregator",{
          from: firstAccount,
          args: [DECIMAL,INITIAL_ASNWER],
          log: true
      });
    } else {
      console.log("env is not local,mock contarct is skipped!");
    }
}
export default main;
main.tags = ["all"];
