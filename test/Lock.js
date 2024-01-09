const hre = require("hardhat");

describe("Lock", function () {

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const CCF = await hre.ethers.getContractFactory("CalculateCallFlow");
      const ccf = await CCF.deploy();
      await ccf.calculateFlow();
    });
  });
});
