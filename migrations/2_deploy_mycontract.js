// migrations/2_deploy_mycontract.js
const MyContract = artifacts.require("MyContract");

module.exports = function (deployer) {
    deployer.deploy(MyContract, 123, "Hello"); // Constructor arguments
};