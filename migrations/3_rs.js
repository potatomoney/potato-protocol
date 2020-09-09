// ============ Contracts ============

// Token
// deployed first
const TATOImplementation = artifacts.require("TATODelegate");
const TATOProxy = artifacts.require("TATODelegator");

// Rs
// deployed second
const TATOReserves = artifacts.require("TATOReserves");
const TATORebaser = artifacts.require("TATORebaser");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployRs(deployer, network),
  ]);
};

module.exports = migration;

// ============ Deploy Functions ============

async function deployRs(deployer, network) {
  let reserveToken = "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8"; // ycrv
  let uniswap_factory = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
  await deployer.deploy(TATOReserves, reserveToken, TATOProxy.address);
  await deployer.deploy(TATORebaser,
    TATOProxy.address,
    reserveToken,
    uniswap_factory,
    TATOReserves.address
  );
  let rebase = new web3.eth.Contract(TATORebaser.abi, TATORebaser.address);

  let pair = await rebase.methods.uniswap_pair().call();
  console.log("TATO <-> YCRV UNISWAP Pair: ", pair)
  let tato = await TATOProxy.deployed();
  await tato._setRebaser(TATORebaser.address);
  console.log("tato._setRebaser");
  let reserves = await TATOReserves.deployed();
  await reserves._setRebaser(TATORebaser.address)
  console.log("reserves._setRebaser");

}
