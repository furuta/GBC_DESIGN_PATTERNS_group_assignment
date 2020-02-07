const MicroFinance = artifacts.require("MicroFinance");

module.exports = function(deployer) {
  deployer.deploy(MicroFinance);
};
