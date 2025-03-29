import { ethers } from "hardhat";


const main = async ()=>{

    const fundMeFunciton = await ethers.getContractFactory("FundMe");
    console.log("contrace is deploy!")
    const _locktime = 3600;
    const fundme = await fundMeFunciton.deploy(_locktime);
    await fundme.waitForDeployment()
    console.log(`contract address is :${fundme.target}`)
    
}
main().then().catch((err)=>{
    console.log(err)
    process.exit(1)
})