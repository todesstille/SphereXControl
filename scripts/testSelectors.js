const hre = require("hardhat");

const printFunctionSignatureFlag = false
const selectorBlackList = [
  "0x150b7a02", // onERC721Received
  "0x76707b6b",
  "0x054889da",
  "0x9ebb6389",
  "0x62d78340",
  "0x2bcbc598",
  "0x9180f690",
  "0x715c6baf",
  "0xb6ccb44d",
  "0x291bcd52",
  "0xb4c05b8c",
  "0xd48c3202",
  "0x70e48e96",
];

function getSelectorsList(contract) {
  let selectors = [];
  for (f in contract.interface.functions) {
    let value = contract.interface.functions[f];
    if (value.type == 'function' && value.stateMutability != 'view' && value.stateMutability != 'pure') {
      let currentSelector = hre.ethers.utils.id(f).substring(0, 10);
      if (printFunctionSignatureFlag) {
        console.log(f, currentSelector);
      }
      if (selectorBlackList.indexOf(currentSelector) == -1) {
        selectors.push(currentSelector);
      }
    }
  }
  return selectors
}

function getCoreRegistryData(contractName, contract) {
  console.log("");
  console.log(contractName);
  let selectors = getSelectorsList(contract);

  let abiCoder = new hre.ethers.utils.AbiCoder();
  let calldata = abiCoder.encode(["string", "bytes4[]"], [contractName, selectors]).slice(2);
  calldata = "0xa3eb8545" + calldata;
  console.log(calldata);
}


function getPoolRegistryData(contractName, contract) {
  console.log("");
  console.log(contractName);
  let selectors = getSelectorsList(contract);

  let abiCoder = new hre.ethers.utils.AbiCoder();
  let calldata = abiCoder.encode(["string", "bytes4[]"], [contractName, selectors]).slice(2);
  calldata = "0xadab6520" + calldata;
  console.log(calldata);
}

async function main() {
  console.log("=== POOL REGISTRY ===")

  const LinearPower = await hre.ethers.getContractFactory("LinearPower");
  getPoolRegistryData("LINEAR_POWER", LinearPower);

  const PolynomialPower = await hre.ethers.getContractFactory("PolynomialPower");
  getPoolRegistryData("POLYNOMIAL_POWER", PolynomialPower);

  const ERC721Multiplier = await hre.ethers.getContractFactory("ERC721Multiplier");
  getPoolRegistryData("NFT_MULTIPLIER", ERC721Multiplier);

  const ERC721Expert = await hre.ethers.getContractFactory("ERC721Expert");
  getPoolRegistryData("EXPERT_NFT", ERC721Expert);

  const TokenSaleProposal = await hre.ethers.getContractFactory(
    "TokenSaleProposal",
    {
      libraries: {
        TokenSaleProposalBuy: hre.ethers.constants.AddressZero,
        TokenSaleProposalClaim: hre.ethers.constants.AddressZero,
        TokenSaleProposalCreate: hre.ethers.constants.AddressZero,
        TokenSaleProposalRecover: hre.ethers.constants.AddressZero,
        TokenSaleProposalVesting: hre.ethers.constants.AddressZero,
        TokenSaleProposalWhitelist: hre.ethers.constants.AddressZero,
      },
    }
    );
  getPoolRegistryData("TOKEN_SALE_PROPOSAL", TokenSaleProposal);

  const DistributionProposal = await hre.ethers.getContractFactory("DistributionProposal");
  getPoolRegistryData("DISTRIBUTION_PROPOSAL", DistributionProposal);

  const GovUserKeeper = await hre.ethers.getContractFactory(
    "GovUserKeeper",
    {
      libraries: {
        GovUserKeeperView: hre.ethers.constants.AddressZero,
      },
    }
    );
  getPoolRegistryData("USER_KEEPER", GovUserKeeper);

  const GovValidators = await hre.ethers.getContractFactory(
    "GovValidators",
    {
      libraries: {
        GovValidatorsCreate: hre.ethers.constants.AddressZero,
        GovValidatorsExecute: hre.ethers.constants.AddressZero,
        GovValidatorsVote: hre.ethers.constants.AddressZero,
      },
    }
    );
  getPoolRegistryData("VALIDATORS", GovValidators);

  const GovSettings = await hre.ethers.getContractFactory("GovSettings");
  getPoolRegistryData("SETTINGS", GovSettings);

  const GovPool = await hre.ethers.getContractFactory(
    "GovPool",
    {
      libraries: {
        GovPoolCreate: hre.ethers.constants.AddressZero,
        GovPoolCredit: hre.ethers.constants.AddressZero,
        GovPoolExecute: hre.ethers.constants.AddressZero,
        GovPoolMicropool: hre.ethers.constants.AddressZero,
        GovPoolOffchain: hre.ethers.constants.AddressZero,
        GovPoolRewards: hre.ethers.constants.AddressZero,
        GovPoolUnlock: hre.ethers.constants.AddressZero,
        GovPoolView: hre.ethers.constants.AddressZero,
        GovPoolVote: hre.ethers.constants.AddressZero,
      },
    }
    );
  getPoolRegistryData("GOV_POOL", GovPool);

  console.log("=== CONTRACTS REGISTRY ===")

  const UserRegistry = await hre.ethers.getContractFactory("UserRegistry");
  getCoreRegistryData("USER_REGISTRY", UserRegistry);

  const PoolFactory = await hre.ethers.getContractFactory(
    "PoolFactory",
    {
      libraries: {
        GovTokenDeployer: hre.ethers.constants.AddressZero,
      },
    }
    );
  getCoreRegistryData("POOL_FACTORY", PoolFactory);

  const PoolRegistry = await hre.ethers.getContractFactory("PoolRegistry");
  getCoreRegistryData("POOL_REGISTRY", PoolRegistry);

  getCoreRegistryData("DEXE_EXPERT_NFT", ERC721Expert);

  const PriceFeed = await hre.ethers.getContractFactory(
    "PriceFeed",
    {
      libraries: {
        UniswapPathFinder: hre.ethers.constants.AddressZero,
      },
    }
  );
  // getPriceFeedRegistryData("PRICE_FEED", PriceFeed);
  getCoreRegistryData("PRICE_FEED", PriceFeed);

  const CoreProperties = await hre.ethers.getContractFactory("CoreProperties");
  getCoreRegistryData("CORE_PROPERTIES", CoreProperties);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});