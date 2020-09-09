// ============ Contracts ============

// Token
// deployed first
const TATOImplementation = artifacts.require("TATODelegate");
const TATOProxy = artifacts.require("TATODelegator");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployToken(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============


async function deployToken(deployer, network) {
  await deployer.deploy(TATOImplementation);
  if (network != "mainnet") {
    await deployer.deploy(TATOProxy,
      "TATO",
      "TATO",
      18,
      "1800000000000000000000000", // 1800k
      TATOImplementation.address,
      "0x"
    );
  } else {
    await deployer.deploy(TATOProxy,
      "TATO",
      "TATO",
      18,
      "1800000000000000000000000", // 1800k
      TATOImplementation.address,
      "0x"
    );
  }

}
