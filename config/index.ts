const DECIMAL = 8;
const INITIAL_ASNWER  = 300000000000
const LOCK_TIME = 180;
const CONFIRMATIONS = 5;
const devlopmentChains = [
    'hardhat',
    'local'
]
const networkConfig = {
    11155111:{
        ethUsdDateFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}

export {
    DECIMAL,
    INITIAL_ASNWER,
    devlopmentChains,
    networkConfig,
    LOCK_TIME,
    CONFIRMATIONS
}