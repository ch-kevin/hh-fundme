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


check                 Check whatever you need
clean                 Clears the cache and deletes all artifacts
compile               Compiles the entire project, building all artifacts
console               Opens a hardhat console
coverage              Generates a code coverage report for tests
deploy-fundme         部署 验证 fundme
flatten               Flattens and prints contracts and their dependencies. If no file is passed, all the contracts in the project will be flattened.
gas-reporter:merge 
help                  Prints this message
interact-fundme       交互 fundme
node                  Starts a JSON-RPC server on top of Hardhat Network
run                   Runs a user-defined script after compiling the project
test                  Runs mocha tests
typechain             Generate Typechain typings for compiled contracts
verify                Verifies a contract on Etherscan or Sourcify

```
