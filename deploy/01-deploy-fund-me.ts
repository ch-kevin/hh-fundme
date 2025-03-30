import *as HRE from "hardhat";
import { DeployFunction } from "hardhat-deploy/dist/types"
import { devlopmentChains, LOCK_TIME, networkConfig } from "../config";
import { network } from "hardhat";

const main: DeployFunction = async ({
    getNamedAccounts,
    deployments,
    // getChainId,
    // getUnnamedAccounts,
  })=>{

    const {firstAccount} = await getNamedAccounts()
    const {deploy} = deployments
    
    let dataFeedAddr = "";
    /*mock*/
    if(devlopmentChains.includes(network.name)){
        const mockV3Aggregator = deployments.get("MockV3Aggregator");
        dataFeedAddr = (await mockV3Aggregator).address;
    }else {
        const chain = networkConfig[network.config.chainId as never] as any;
        dataFeedAddr = chain.ethUsdDateFeed;
    }

    const fundme = await deploy("FundMe",{
        from: firstAccount,
        args: [LOCK_TIME,dataFeedAddr],
        log: true
    });

    if(HRE.network.config.chainId === 11155111 && process.env.ETHERSCAN_KEYS){
        await HRE.run("verify:verify", {
            address: fundme.address,
            constructorArguments: [LOCK_TIME,dataFeedAddr],
          });
    } else {

        console.log("network is not sepolia ,skip!!!")
    }
};
export default main;
main.tags = ["all","fundme"];
