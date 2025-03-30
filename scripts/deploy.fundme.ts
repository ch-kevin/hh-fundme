
import HRE,{ethers} from "hardhat";

const main = async ()=>{

    const fundMeFunciton = await ethers.getContractFactory("FundMe");
    console.log("contrace is deploy!")
    const _locktime = 3600;
    const fundme = await fundMeFunciton.deploy(_locktime);
    await fundme.waitForDeployment()
    console.log(`contract address is :${fundme.target}`)
    
    if(HRE.network.config.chainId === 11155111 && process.env.ETHERSCAN_KEYS){

        const res = await fundme.deploymentTransaction();

        res ? res.wait(5): "";

        await verifyFundMe(fundme.target as string,[10])
    } else {
        console.log("verification skipped."); 
    }


    const [firstAcount,secAcount] = await ethers.getSigners();
}

async function verifyFundMe(fundMeAddr:string, args: any[]) {
    await HRE.run("verify:verify", {
        address: fundMeAddr,
        constructorArguments: args,
      });
}

main().then().catch((err)=>{
    console.log(err)
    process.exit(1)
})