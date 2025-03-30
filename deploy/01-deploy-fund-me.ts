import { DeployFunction } from "hardhat-deploy/dist/types"

const main: DeployFunction = async ({
    getNamedAccounts,
    deployments,
    // getChainId,
    // getUnnamedAccounts,
  })=>{
    const {firstAccount} = await getNamedAccounts()
    const {deploy} = deployments

    await deploy("FundMe",{
        from: firstAccount,
        args: [180],
        log: true
    });
};
export default main;
export const tags = ['all',"fundme"];
