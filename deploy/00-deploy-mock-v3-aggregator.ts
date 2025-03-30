import { DeployFunction } from "hardhat-deploy/dist/types"
import { DECIMAL, INITIAL_ASNWER } from "../config";

const main: DeployFunction = async ({
    getNamedAccounts,
    deployments,
    // getChainId,
    // getUnnamedAccounts,
  })=>{
    const {firstAccount} = await getNamedAccounts()
    const {deploy} = deployments

    await deploy("MockV3Aggregator",{
        from: firstAccount,
        args: [DECIMAL,INITIAL_ASNWER],
        log: true
    });
};
export default main;
export const tags = ['all',"mock"];
