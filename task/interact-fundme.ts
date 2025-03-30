import { task } from "hardhat/config"

task("interact-fundme","交互 fundme")
    .addParam("addr","fundme contarct address")
    .setAction(async (taskArg,hre:any)=>{

        const fundMeFactory = await hre.ethers.getContractFactory("FundMe")
        const fundMe:any = fundMeFactory.attach(taskArg.addr)

        // init 2 accounts
        const [firstAccount, secondAccount] = await hre.ethers.getSigners()

        // fund contract with first account
        const fundTx = await fundMe.fund({value: hre.ethers.parseEther("0.5")})
        await fundTx.wait()

        // check balance of contract
        const balanceOfContract = await hre.ethers.provider.getBalance(fundMe.target)
        console.log(`Balance of the contract is ${balanceOfContract}`)

        // fund contract with second account
        const fundTxWithSecondAccount = await fundMe.connect(secondAccount).fund({value: hre.ethers.parseEther("0.5")})
        await fundTxWithSecondAccount.wait()

        // check balance of contract
        const balanceOfContractAfterSecondFund = await hre.ethers.provider.getBalance(fundMe.target)
        console.log(`Balance of the contract is ${balanceOfContractAfterSecondFund}`)

        // check mapping 
        const firstAccountbalanceInFundMe = await fundMe.fundersToAmount(firstAccount.address)
        const secondAccountbalanceInFundMe = await fundMe.fundersToAmount(secondAccount.address)
        console.log(`Balance of first account ${firstAccount.address} is ${firstAccountbalanceInFundMe}`)
        console.log(`Balance of second account ${secondAccount.address} is ${secondAccountbalanceInFundMe}`)

})

export {}