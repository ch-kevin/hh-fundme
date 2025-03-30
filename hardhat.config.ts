import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";
import "./task/index";

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
  solidity: "0.8.28",
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
};

export default config;
