const hre = require("hardhat");
const {getTransactionList} = require("./utils/txList.js");

const txs = getTransactionList("VALIDATORS_POOL_LIST");

async function main() {
    let patterns = [];
    let abiCoder = new hre.ethers.utils.AbiCoder();

    for (let tx of txs) {
        tx = "0x" + tx.substring(10);
        let uints = abiCoder.decode(["uint[]"], tx);
        uints = uints[0].map((x) => x.toString());
        for (uint of uints) {
            if (patterns.indexOf(uint) == -1) {
                patterns.push(uint);
            }
        }
    }
    patterns = patterns.map((x) => hre.ethers.BigNumber.from(x));
    let result = abiCoder.encode(["uint[]"], [patterns]);
    result = "0x04539062" + result.substring(2);
    console.log(result);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });