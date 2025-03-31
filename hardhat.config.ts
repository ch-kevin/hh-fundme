import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";
import "./task/index";
import 'hardhat-deploy';

import '@nomicfoundation/hardhat-ethers';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';

import "hardhat-gas-reporter";

// change to yours, With the global proxy enabled, change the proxyUrl to your own proxy link. The port may be different for each client.
const proxyUrl = "http://127.0.0.1:33210" 
const { ProxyAgent, setGlobalDispatcher } = require("undici")
const proxyAgent = new ProxyAgent(proxyUrl)
setGlobalDispatcher(proxyAgent)

// export https_proxy=http://127.0.0.1:33210 http_proxy=http://127.0.0.1:33210 all_proxy=socks5://127.0.0.1:33211

//import * as envEnc from "@chainlink/env-enc";
//envEnc.config();

const SEPOLIA_URL: string = process.env.SEPOLIA_URL as string;
const PRIVITE_KEY1: string = process.env.PRIVITE_KEY1 as string;
const PRIVITE_KEY2: string = process.env.PRIVITE_KEY2 as string;
const ETHERSCAN_KEYS: string = process.env.ETHERSCAN_KEYS as string;

// const SEPOLIA_URL: string = vars.get("SEPOLIA_URL");
// const PRIVITE_KEY1: string = vars.get("PRIVITE_KEY1");
// const PRIVITE_KEY2: string = vars.get("PRIVITE_KEY2");

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.28",
  mocha:{
    timeout: 300000
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVITE_KEY1, PRIVITE_KEY2],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_KEYS
    }
  }
  
  // sourcify: {
    // Disabled by default
    // Doesn't need an API key
    // enabled: true
  // }
  ,
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    },
  },
  gasReporter: {
    enabled: true
  }
};

export default config;
