const hre = require("hardhat");
const CORE_ENGINE_ADDRESS = "0xb77483fe9A7405e94BD8b4C0cAeA0FD4C5b793C4";

async function main() {
    // const poolEngine = await hre.ethers.getContractAt("SphereXEngine", CORE_ENGINE_ADDRESS);
    const [admin] = await hre.ethers.getSigners()
    let tx = await admin.sendTransaction({
        value: 0,
        to: CORE_ENGINE_ADDRESS,
        data: "0x0453906200000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000011000000000043e860d015873721367befd0d0261df91c8a44b815d97f1d3d05a2000000000016b316dd3ec8b82806409084e0c31b765c2a1b5bc28939c13f952a0000000000ee5248d89f8c5200bf04780fef4f77b2eddd410c8963a1cf7d85f10000000000280c20d63266f46325e0d5123c23a693c417dd1fac2d0cf44122f400000000004d8b6fbea9e68680e04447789f5b90b667aaf7123e8b04a9fcc71d00000000009cc5e77d970f225c73181d2fff00e3a1887bedd9c1045e5613ad3200000000001c9493c801f417d2a439292d7dbf7d75c0b708e082f5694ff0c619000000000033b81d221a4923dbaa8719d2b640a4ba5a9cc07617a3a097354fae0000000000aed5664b23c94cc3e8b021db12d92deaa6da83c071add8f758731900000000001390a119f766da58dca1c8516813ce1c57caeefded2b6c8cbf8861000000000012de3a10eb003ee87be0175ccbc0ab0c9038512c090e16690d1037000000000043160a317e700d638763799a23898c7549a8b290b9b22d23dbd63d00000000008bfbe2f326509e6312342217e0fb59f4176ba61ed0e5eda8e56c490000000000cae39c5a81ab7dd57ff1e27597732f89446d61c5ad4375da5cb2e400000000004cc0629c38729839e551735afa36aad1c6a30937af00d4505886230000000000683677371ccbe6ebcd874cd8b63ef167f42325a25329c081755dcd00000000002083f867afbb0f7e928dfb91a4b16bb45471ecb365ed0868ea2817",
        // 0x80a0b6da
    });
    await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});