var fs = require('fs')

// ============ Contracts ============


// Protocol
// deployed second
const TATOImplementation = artifacts.require("TATODelegate");
const TATOProxy = artifacts.require("TATODelegator");

// deployed third
const TATOReserves = artifacts.require("TATOReserves");
const TATORebaser = artifacts.require("TATORebaser");

const Gov = artifacts.require("GovernorAlpha");
const Timelock = artifacts.require("Timelock");

// deployed fourth
const TATO_USDTPool = artifacts.require("TATOUSDTPool");
const TATO_YFIPool = artifacts.require("TATOYFIPool");
const TATO_DFPool = artifacts.require("TATODFPool");
const TATO_FORPool = artifacts.require("TATOFORPool");
const TATO_GARDPool = artifacts.require("TATOGARDPool");
const TATO_MATHPool = artifacts.require("TATOMATHPool");
const TATO_MCBPool = artifacts.require("TATOMCBPool");
const TATO_RENPool = artifacts.require("TATORENPool");
const TATO_YCRVPool = artifacts.require("TATOYCRVPool");
const TATO_BMCPool = artifacts.require("TATOBMCPool");
const TATO_SUSHIPool = artifacts.require("TATOSUSHIPool");
const TATO_AISIPool = artifacts.require("TATOAISIPool");

// deployed fifth
const TATOIncentivizer = artifacts.require("TATOIncentivizer");

//verify contract
// example : truffle run verify TATODelegator --network kovan

// deployed end
//create_pair in uniswap
//TATORebaser->init_twap->after 12h activate_rebasing->wait 16pm or 4am (UTC+8) rebase


const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployDistribution(deployer, network, accounts),
  ]);
}

module.exports = migration;

// ============ Deploy Functions ============

async function deployDistribution(deployer, network, accounts) {
  console.log(network);
  let account = accounts[0];
  let tatoAddress = TATOProxy.address;
  let reservesAddress = TATOReserves.address;
  let rebaserAddress = TATORebaser.address;
  let tlAddress = Timelock.address;
  let govAddress = Gov.address;
  console.log("account =", account);

  let tato = new web3.eth.Contract(TATOProxy.abi, tatoAddress);
  let yReserves = new web3.eth.Contract(TATOReserves.abi, reservesAddress);
  let yRebaser = new web3.eth.Contract(TATORebaser.abi, rebaserAddress);
  let tl = new web3.eth.Contract(Timelock.abi, tlAddress);
  let gov = new web3.eth.Contract(Gov.abi, govAddress);
  let pair = await yRebaser.methods.uniswap_pair().call();

  console.log("deploying pools")
  await deployer.deploy(TATO_USDTPool, tatoAddress);
  await deployer.deploy(TATO_YFIPool, tatoAddress);
  await deployer.deploy(TATO_DFPool, tatoAddress);
  await deployer.deploy(TATO_FORPool, tatoAddress);
  await deployer.deploy(TATO_GARDPool, tatoAddress);
  await deployer.deploy(TATO_MATHPool, tatoAddress);
  await deployer.deploy(TATO_MCBPool, tatoAddress);
  await deployer.deploy(TATO_RENPool, tatoAddress);
  await deployer.deploy(TATO_YCRVPool, tatoAddress);
  await deployer.deploy(TATO_BMCPool, tatoAddress);
  await deployer.deploy(TATO_SUSHIPool, tatoAddress);
  await deployer.deploy(TATO_AISIPool, tatoAddress);

  await deployer.deploy(TATOIncentivizer, pair, tatoAddress);


  //
  let usdt_pool = new web3.eth.Contract(TATO_USDTPool.abi, TATO_USDTPool.address);
  let yfi_pool = new web3.eth.Contract(TATO_YFIPool.abi, TATO_YFIPool.address);
  let df_pool = new web3.eth.Contract(TATO_DFPool.abi, TATO_DFPool.address);
  let for_pool = new web3.eth.Contract(TATO_FORPool.abi, TATO_FORPool.address);
  let gard_pool = new web3.eth.Contract(TATO_GARDPool.abi, TATO_GARDPool.address);
  let math_pool = new web3.eth.Contract(TATO_MATHPool.abi, TATO_MATHPool.address);
  let mcb_pool = new web3.eth.Contract(TATO_MCBPool.abi, TATO_MCBPool.address);
  let ren_pool = new web3.eth.Contract(TATO_RENPool.abi, TATO_RENPool.address);
  let ycrv_pool = new web3.eth.Contract(TATO_YCRVPool.abi, TATO_YCRVPool.address);
  let bmc_pool = new web3.eth.Contract(TATO_BMCPool.abi, TATO_BMCPool.address);
  let sushi_pool = new web3.eth.Contract(TATO_SUSHIPool.abi, TATO_SUSHIPool.address);
  let aisi_pool = new web3.eth.Contract(TATO_AISIPool.abi, TATO_AISIPool.address);

  let tato_incentivizer_pool = new web3.eth.Contract(TATOIncentivizer.abi, TATOIncentivizer.address);
  //
  console.log("setting distributor.......");
  await usdt_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("usdt_pool.methods.setRewardDistribution");
  await yfi_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("yfi_pool.methods.setRewardDistribution");
  await df_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("df_pool.methods.setRewardDistribution");
  await for_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("for_pool.methods.setRewardDistribution");
  await gard_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("gard_pool.methods.setRewardDistribution");
  await math_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("math_pool.methods.setRewardDistribution");
  await mcb_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("mcb_pool.methods.setRewardDistribution");
  await ren_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("ren_pool.methods.setRewardDistribution");
  await ycrv_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("ycrv_pool.methods.setRewardDistribution");
  await bmc_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("bmc_pool.methods.setRewardDistribution");
  await sushi_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("sushi_pool.methods.setRewardDistribution");
  await aisi_pool.methods.setRewardDistribution(account).send({from: account, gas: 100000});
  console.log("aisi_pool.methods.setRewardDistribution");


  await tato_incentivizer_pool.methods.setRewardDistribution(account).send({
    from: account,
    gas: 100000
  });
  console.log("tato_incentivizer_pool.methods.setRewardDistribution");

  //630,000
  let initReservesTokenInPool = web3.utils.toBN(630000).mul(web3.utils.toBN(10 ** 18));
  //106,364
  let initOtherTokenInPool = web3.utils.toBN(106364).mul(web3.utils.toBN(10 ** 18));
  //106,360
  let initAisiTokenInPool = web3.utils.toBN(106360).mul(web3.utils.toBN(10 ** 18));

  console.log("transfering.......");
  await tato.methods.transfer(TATO_USDTPool.address, initReservesTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_USDTPool ");
  await tato.methods.transfer(TATO_YFIPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_YFIPool ");
  await tato.methods.transfer(TATO_DFPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_DFPool ");
  await tato.methods.transfer(TATO_FORPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_FORPool ");
  await tato.methods.transfer(TATO_GARDPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_GARDPool ");
  await tato.methods.transfer(TATO_MATHPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_MATHPool ");
  await tato.methods.transfer(TATO_MCBPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_MCBPool ");
  await tato.methods.transfer(TATO_RENPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_RENPool ");
  await tato.methods.transfer(TATO_YCRVPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_YCRVPool ");
  await tato.methods.transfer(TATO_BMCPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_BMCPool ");
  await tato.methods.transfer(TATO_SUSHIPool.address, initOtherTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_SUSHIPool ");
  await tato.methods.transfer(TATO_AISIPool.address, initAisiTokenInPool.toString()).send({from: account});
  console.log("transfering TATO_AISIPool ");


  await tato.methods._setIncentivizer(TATOIncentivizer.address).send({from: account});
  console.log("tato.methods._setIncentivizer");

  console.log("notifying.......")
  await usdt_pool.methods.notifyRewardAmount(initReservesTokenInPool.toString()).send({from: account});
  console.log("notifying usdt_pool")
  await yfi_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying yfi_pool")
  await df_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying df_pool")
  await for_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying for_pool")
  await gard_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying gard_pool")
  await math_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying math_pool")
  await mcb_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying mcb_pool")
  await ren_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying ren_pool")
  await ycrv_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying ycrv_pool")
  await bmc_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying bmc_pool")
  await sushi_pool.methods.notifyRewardAmount(initOtherTokenInPool.toString()).send({from: account});
  console.log("notifying sushi_pool")
  await aisi_pool.methods.notifyRewardAmount(initAisiTokenInPool.toString()).send({from: account});
  console.log("notifying aisi_pool")

  // incentives is a minter and prepopulates itself.
  await tato_incentivizer_pool.methods.notifyRewardAmount("0").send({
    from: account,
    gas: 500000
  });
  console.log("notifying tato_incentivizer_pool")

  console.log("set reward distribution to timelock.......")
  await usdt_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("usdt_pool set reward distribution to timelock")
  await yfi_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("yfi_pool set reward distribution to timelock")
  await df_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("df_pool set reward distribution to timelock")
  await for_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("for_pool set reward distribution to timelock")
  await gard_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("gard_pool set reward distribution to timelock")
  await math_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("math_pool set reward distribution to timelock")
  await mcb_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("mcb_pool set reward distribution to timelock")
  await ren_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("ren_pool set reward distribution to timelock")
  await ycrv_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("ycrv_pool set reward distribution to timelock")
  await bmc_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("bmc_pool set reward distribution to timelock")
  await sushi_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("sushi_pool set reward distribution to timelock")
  await aisi_pool.methods.setRewardDistribution(tlAddress).send({from: account, gas: 100000});
  console.log("aisi_pool set reward distribution to timelock")

  await  tato_incentivizer_pool.methods.setRewardDistribution(tlAddress).send({
    from: account,
    gas: 100000
  });
  console.log("tato_incentivizer_pool set reward distribution to timelock")

  console.log("transer ownership for pools.......")
  await usdt_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("usdt_pool transer ownership for pools")
  await yfi_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("yfi_pool transer ownership for pools")
  await df_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("df_pool transer ownership for pools")
  await for_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("for_pool transer ownership for pools")
  await gard_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("gard_pool transer ownership for pools")
  await math_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("math_pool transer ownership for pools")
  await mcb_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("mcb_pool transer ownership for pools")
  await ren_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("ren_pool transer ownership for pools")
  await ycrv_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("ycrv_pool transer ownership for pools")
  await bmc_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("bmc_pool transer ownership for pools")
  await sushi_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("sushi_pool transer ownership for pools")
  await aisi_pool.methods.transferOwnership(tlAddress).send({from: account, gas: 100000});
  console.log("aisi_pool transer ownership for pools")

  await tato_incentivizer_pool.methods.transferOwnership(tlAddress).send({
    from: account,
    gas: 100000
  });
  console.log("tato_incentivizer_pool transer ownership for pools")

  console.log("transer ownership for all.......")
  await tato.methods._setPendingGov(tlAddress).send({from: account});
  console.log(" tato transer ownership")
  await yReserves.methods._setPendingGov(tlAddress).send({from: account});
  console.log(" reserves transer ownership")
  await yRebaser.methods._setPendingGov(tlAddress).send({from: account});
  console.log(" rebaser transer ownership")

  console.log("accept ownership.......")
  await tl.methods.executeTransaction(tatoAddress, 0, "_acceptGov()", "0x", 0).send({from: account});
  console.log("tato accept ownership")
  await tl.methods.executeTransaction(reservesAddress, 0, "_acceptGov()", "0x", 0).send({from: account});
  console.log("reserves accept ownership")
  await tl.methods.executeTransaction(rebaserAddress, 0, "_acceptGov()", "0x", 0).send({from: account});
  console.log("rebaser accept ownership")

  console.log("set and accept ownership for gov.......")
  await tl.methods.setPendingAdmin(govAddress).send({from: account});
  console.log("tl.methods.setPendingAdmin")
  await gov.methods.__acceptAdmin().send({from: account});
  console.log("gov.methods.__acceptAdmin")
  await gov.methods.__abdicate().send({from: account});
  console.log("gov.methods.__abdicate")


  console.log("Pair Address=", await  yRebaser.methods.uniswap_pair().call());
  console.log("TATO Address=", tatoAddress);
  console.log("Reserves Address=", reservesAddress);
  console.log("Rebaser Address=", rebaserAddress);
  console.log("TimeLock Address=", tlAddress);
  console.log("GOV Address=", govAddress);
  console.log("TATO_USDTPool Address=", TATO_USDTPool.address);
  console.log("TATO_YFIPool Address=", TATO_YFIPool.address);
  console.log("TATO_DFPool Address=", TATO_DFPool.address);
  console.log("TATO_FORPool Address=", TATO_FORPool.address);
  console.log("TATO_GARDPool Address=", TATO_GARDPool.address);
  console.log("TATO_MATHPool Address=", TATO_MATHPool.address);
  console.log("TATO_MCBPool Address=", TATO_MCBPool.address);
  console.log("TATO_RENPool Address=", TATO_RENPool.address);
  console.log("TATO_YCRVPool Address=", TATO_YCRVPool.address);
  console.log("TATO_BMCPool Address=", TATO_BMCPool.address);
  console.log("TATO_SUSHIPool Address=", TATO_SUSHIPool.address);
  console.log("TATO_AISIPool Address=", TATO_AISIPool.address);

  console.log("TATOIncentivizer Address=", TATOIncentivizer.address);


}
