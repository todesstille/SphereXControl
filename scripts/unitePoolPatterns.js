const hre = require("hardhat");
const {getTransactionList} = require("./utils/txList.js");
const {unitePatterns, repackPatterns} = require("./utils/utils.js");

const txs = getTransactionList("DEFAULT_POOL_LIST");

async function main() {
    let patterns = [];
    let abiCoder = new hre.ethers.utils.AbiCoder();

    for (let tx of txs) {
        patterns = unitePatterns(patterns, tx);
    }
    let result = repackPatterns(patterns);
    console.log(result);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });