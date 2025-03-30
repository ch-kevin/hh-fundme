import { task } from "hardhat/config";


task("deploy-fundme","部署 验证 fundme").setAction(async (taskArg,hre:any)=>{
    const fundMeFunciton = await hre.ethers.getContractFactory("FundMe");
    console.log("contrace is deploy!")
    const _locktime = 3600;
    const fundme = await fundMeFunciton.deploy(_locktime);
    await fundme.waitForDeployment()
    console.log(`contract address is :${fundme.target}`)
    
    if(hre.network.config.chainId === 11155111 && process.env.ETHERSCAN_KEYS){
        const res = await fundme.deploymentTransaction();
        res ? res.wait(5): "";
        await verifyFundMe(fundme.target as string,[10],hre)
    } else {
        console.log("verification skipped."); 
    }
    
})

async function verifyFundMe(fundMeAddr:string, args: any[],hre:any) {
    await hre.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
      });
}

export {}