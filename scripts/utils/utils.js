const hre = require("hardhat");

function unitePatterns(patterns, tx) {
    let abiCoder = new hre.ethers.utils.AbiCoder();

    tx = "0x" + tx.substring(10);
    let uints = abiCoder.decode(["uint[]"], tx);
    uints = uints[0].map((x) => x.toString());
    for (uint of uints) {
        if (patterns.indexOf(uint) == -1) {
            patterns.push(uint);
        }
    }

    return patterns;
}

function repackPatterns(patterns) {
    let abiCoder = new hre.ethers.utils.AbiCoder();

    patterns = patterns.map((x) => hre.ethers.BigNumber.from(x));
    let result = abiCoder.encode(["uint[]"], [patterns]);
    result = "0x04539062" + result.substring(2);
    return result;
}

module.exports = {
    unitePatterns,
    repackPatterns,
  };
