var Gox = artifacts.require("./Gox.sol");

module.exports = function(deployer) {
  deployer.deploy(Gox);
};
