const { Web3 } = require('web3');
const contractABI = require('./AutomatedParkingSystem.json').abi;
const contractAddress = '0x591D8c585558b2cCa052A9B8e042d3EffA379deA';
const web3 = new Web3('http://127.0.0.1:9545/');
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Register Parking Area
export async function registerParkingArea(name, parkingRatePerHour, parkingAreaAddress) {
    return contract.methods.registerParkingArea(name, parkingRatePerHour)
        .send({ from: parkingAreaAddress, gas: 300000 });
}

// Park In
async function parkIn(parkingAreaAddress, registrationNumber, parkingStartTime, vehicleOwnerAddress) {
    return contract.methods.parkIn(parkingAreaAddress, registrationNumber, parkingStartTime)
        .send({ from: vehicleOwnerAddress, gas: 300000 });
}

// Park Out
async function parkOut(parkingAreaAddress, registrationNumber, parkingEndTime, vehicleOwnerAddress, payRate) {
    const accounts = await web3.eth.getAccounts();
    return contract.methods.parkOut(parkingAreaAddress, registrationNumber, parkingEndTime)
        .send({ from: vehicleOwnerAddress, value: payRate, gas: 300000 });
}

export async function getCurrentlyParkedVehicles(parkingAreaAddress) {
    return contract.methods.getCurrentlyParkedVehicles(parkingAreaAddress)
        .call();
}


export async function getAllParkings() {
    return contract.methods.getAllParkings().call();
}


export async function isParkingExist(parkingAreaAddress) {
    return contract.methods.isParkingExist(parkingAreaAddress).call();
}


const parking = async () => {
    const parkingAddress = '0xb992fc5c1bddd7314d214d8619c3e3cf8ef62165';
    const vehicleOwnerAddress = '0xa6c9bbe3767e02100993ba13c509fb8cfbfcc3c6';
    // console.log(await registerParkingArea('noman parking', 1200, parkingAddress));
    // console.log(await getAllParkings());
    // console.log(await parkIn(parkingAddress, 'qqw12121', 1200, vehicleOwnerAddress));
    console.log(await getCurrentlyParkedVehicles(parkingAddress));
    // console.log(await parkOut(parkingAddress, 'qqw12121', 1800, vehicleOwnerAddress, 1200));
}
parking();