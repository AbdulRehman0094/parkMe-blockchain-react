const AutomatedParkingSystem = artifacts.require("AutomatedParkingSystem");

module.exports = function (deployer) {
    deployer.deploy(AutomatedParkingSystem);
};