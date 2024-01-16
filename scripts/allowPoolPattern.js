const hre = require("hardhat");
const POOL_ENGINE_ADDRESS = "0xC7ADd101DF6Bfa1A9bA42A1567d3Fe51C18eEc23";

async function main() {
    // const poolEngine = await hre.ethers.getContractAt("SphereXEngine", POOL_ENGINE_ADDRESS);
    const [admin] = await hre.ethers.getSigners()
    let tx = await admin.sendTransaction({
        value: 0,
        to: POOL_ENGINE_ADDRESS,
        data: "0x04539062000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000F107DB4ACA5868550DA730D8726A1A6E2A6EE492B837661CCC4E42",
        // 0x80a0b6da
    });
    await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});