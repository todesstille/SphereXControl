const hre = require("hardhat");
const {unitePatterns, repackPatterns} = require("../scripts/utils/utils.js");

describe("Calculate Patterns", function () {

  describe("Calculate One Pattern", function () {
    it("One Pattern", async function () {
      const CCF = await hre.ethers.getContractFactory("CalculateCallFlow");
      const ccf = await CCF.deploy();
      console.log(await ccf.callStatic.calculateFlow());
    });

    it("Multiple Multiplier Mints", async function () {
      const CCF = await hre.ethers.getContractFactory("CalculateCallFlow");
      const ccf = await CCF.deploy();

      let patterns = []
      for (let i = 1; i < 501; i++) {
        console.log(i);
        let tx = await ccf.callStatic.calculateMultiplierMint(i)
        patterns = unitePatterns(patterns, tx);
      }
      console.log(patterns.length);
      let result = repackPatterns(patterns);
      console.log(result);  
    });

    it("Multiple Multiplier Mints And Validate", async function () {
      const CCF = await hre.ethers.getContractFactory("CalculateCallFlow");
      const ccf = await CCF.deploy();

      let patterns = []
      for (let i = 1; i < 501; i++) {
        console.log(i);
        let tx = await ccf.callStatic.calculateMultiplierMintAndValidate(i)
        patterns = unitePatterns(patterns, tx);
      }
      console.log(patterns.length);
      let result = repackPatterns(patterns);
      console.log(result);  
    });

    it("Multiple Whitelist Mints", async function () {
      const CCF = await hre.ethers.getContractFactory("CalculateCallFlow");
      const ccf = await CCF.deploy();

      let patterns = []
      for (let i = 1; i < 501; i++) {
        console.log(i);
        let tx = await ccf.callStatic.calculateWhitelist(i)
        patterns = unitePatterns(patterns, tx);
      }
      console.log(patterns.length);
      let result = repackPatterns(patterns);
      console.log(result);  
    });

    it("Multiple Whitelist Validate Mints", async function () {
      const CCF = await hre.ethers.getContractFactory("CalculateCallFlow");
      const ccf = await CCF.deploy();

      let patterns = []
      for (let i = 1; i < 501; i++) {
        console.log(i);
        let tx = await ccf.callStatic.calculateWhitelistValidate(i)
        patterns = unitePatterns(patterns, tx);
      }
      console.log(patterns.length);
      let result = repackPatterns(patterns);
      console.log(result);  
    });

    // it.only("500 Mints", async function () {
    //   // const ERC721Multiplier = await hre.ethers.getContractFactory("ERC721Multiplier");
    //   const mult = await hre.ethers.getContractAt("ERC721Multiplier", "0xF490747d3d471428C433ce51411D02B27B509FE8");
    //   let mints = [];
    //   for (let i = 1; i < 100; i++) {
    //     let hexNumber = i.toString(16);
    //     let l = hexNumber.length;
    //     for (let j = 0; j < 40 - l; j++) {
    //       hexNumber = "0" + hexNumber;
    //     }
    //     hexNumber = "0x" + hexNumber;
    //     let tx = await mult.populateTransaction.mint(
    //       hexNumber, 
    //       hre.ethers.BigNumber.from("1300000000000000000"),
    //       hre.ethers.BigNumber.from("1762859460000"),
    //       "ipfs://Qmf4X8xhJ9Cy2CjjxXjxUdMJyixfnhj7bQrrYTbBFQBCuA"
    //     )
    //     let element = [tx.to, 0, tx.data];
    //     mints.push(element)
    //   }
    //   let govPool = await hre.ethers.getContractAt("GovPool", "0xAa62DB1647e23Eca4933DbF4e81242594282586f");
    //   let tx = await govPool.populateTransaction.createProposal(
    //     "ipfs://QmPt6UePCi3hYXUX3mqdvecGPfjhBkgjagHTq4KbTjNEvL",
    //     mints,
    //     []
    //   );
    //   console.log(tx.data)

    // });

  });
});
