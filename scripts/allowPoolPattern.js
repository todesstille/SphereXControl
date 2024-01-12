const hre = require("hardhat");
const POOL_ENGINE_ADDRESS = "0xC7ADd101DF6Bfa1A9bA42A1567d3Fe51C18eEc23";

async function main() {
    // const poolEngine = await hre.ethers.getContractAt("SphereXEngine", POOL_ENGINE_ADDRESS);
    const [admin] = await hre.ethers.getSigners()
    let tx = await admin.sendTransaction({
        value: 0,
        to: POOL_ENGINE_ADDRESS,
        data: "0x045390620000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000700000000001943f703ad0c6ed655a74c41ba6c92933dd549cb2afaef49042d6a0000000000bb64a0059860accccee05700345457dd7a3862bb318cfed6adc8e60000000000bbd8122e96b3e2ae588c2ae7cc80aeaeec3ff5edafc2c4ed5d94c00000000000a4f0ff61af2ae3ccc39a2127bf7a471a47c23633d43dd2dcdf73ec0000000000d6974352f8707ea3895c79ca1046032c37b0ca0588734b23134ceb0000000000e7a24bf07e6e49be1d14aa8d76afbfad1487224c0d540a6edeec2f0000000000fc73d567f03b6779f0fec51ee55dcb0dac84816a51ae5ac3e62c6d",
        // 0x80a0b6da
    });
    await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});