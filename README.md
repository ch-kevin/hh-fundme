# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts



npx hardhat run ./scripts/deploy.fundme.ts --network sepolia 

npx hardhat deploy --tags all 本地
npx hardhat deploy --tags fundme --network sepolia 测试
npx hardhat test 
·------------------------|----------------------------|-------------|-----------------------------·
|  Solc version: 0.8.28  ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
·························|····························|·············|······························
|  Methods                                                                                        │
·············|···········|··············|·············|·············|···············|··············
|  Contract  ·  Method   ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
·············|···········|··············|·············|·············|···············|··············
|  FundMe    ·  fund     ·           -  ·          -  ·      66322  ·           10  ·          -  │
·············|···········|··············|·············|·············|···············|··············
|  FundMe    ·  getFund  ·           -  ·          -  ·      74843  ·            2  ·          -  │
·············|···········|··············|·············|·············|···············|··············
|  FundMe    ·  reFund   ·           -  ·          -  ·      51310  ·            2  ·          -  │
·············|···········|··············|·············|·············|···············|··············
|  Deployments           ·                                          ·  % of limit   ·             │
·························|··············|·············|·············|···············|··············
|  FundMe                ·           -  ·          -  ·    1306569  ·        4.4 %  ·          -  │
·························|··············|·············|·············|···············|··············
|  MockV3Aggregator      ·           -  ·          -  ·     694833  ·        2.3 %  ·          -  │
·------------------------|--------------|-------------|-------------|---------------|-------------·
npx hardhat test --network sepolia

npx hardhat coverage

-----------------------|----------|----------|----------|----------|----------------|
File                   |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------------|----------|----------|----------|----------|----------------|
 contracts/            |    69.23 |    58.33 |    57.14 |    70.73 |                |
  FundMe.sol           |    94.74 |       75 |    72.73 |    87.88 | 71,102,103,106 |
  FundTokenERC20.sol   |        0 |        0 |        0 |        0 |... 24,30,31,32 |
 contracts/mocks/      |      100 |      100 |      100 |      100 |                |
  MockV3Aggregator.sol |      100 |      100 |      100 |      100 |                |
-----------------------|----------|----------|----------|----------|----------------|
All files              |    69.23 |    58.33 |    57.14 |    70.73 |                |
-----------------------|----------|----------|----------|----------|----------------|

```
