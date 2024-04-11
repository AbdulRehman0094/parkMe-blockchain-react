// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AutomatedParkingSystem {
    struct ParkingArea {
        address parkingAreaAddress;
        string name;
        uint256 parkingRatePerHour;
    }

    struct Vehicle {
        address owner;
        string registrationNumber;
        uint256 parkingStartTime;
        bool isCurrentlyParked;
        address parkingAreaAddress;
    }

    address[] public parkingAreasAddresses;
    string[] public vehiclesRegistrationNumbers;

    mapping(string => Vehicle) public vehicles;
    mapping(address => ParkingArea) public parkingAreas;

    event VehicleParked(
        address indexed parkingAreaOwner,
        string registrationNumber,
        uint256 parkingStartTime
    );
    event VehicleParkedOut(
        address indexed parkingAreaOwner,
        string registrationNumber,
        uint256 parkingDuration,
        uint256 amountPaid
    );

    function registerParkingArea(
        string memory _name,
        uint256 _parkingRatePerHour
    ) external {
        require(
            _parkingRatePerHour > 0,
            "Parking rate per hour must be greater than zero"
        );
        parkingAreas[msg.sender] = ParkingArea(
            msg.sender,
            _name,
            _parkingRatePerHour
        );
        parkingAreasAddresses.push(msg.sender);
    }

    function parkIn(
        address _parkingAreaAddress,
        string memory _registrationNumber,
        uint256 _parkingStartTime
    ) external {
        require(
            _parkingAreaAddress != address(0),
            "Invalid parking area owner address"
        );
        require(
            _parkingStartTime > 0,
            "Parking start time must be greater than zero"
        );

        // check if vehicle already exist with this registration number
        require(
            !vehicles[_registrationNumber].isCurrentlyParked,
            "Vehicle is already parked"
        );
        vehicles[_registrationNumber] = Vehicle(
            msg.sender,
            _registrationNumber,
            _parkingStartTime,
            true,
            _parkingAreaAddress
        );
        vehiclesRegistrationNumbers.push(_registrationNumber);
        emit VehicleParked(
            _parkingAreaAddress,
            _registrationNumber,
            _parkingStartTime
        );
    }

    function parkOut(
        address _parkingAreaAddress,
        string memory _registrationNumber,
        uint256 _parkingEndTime
    ) external payable {
        require(
            _parkingAreaAddress != address(0),
            "Invalid parking area owner address"
        );
        require(
            _parkingEndTime > 0,
            "Parking end time must be greater than zero"
        );
        require(
            vehicles[_registrationNumber].isCurrentlyParked,
            "Vehicle is not parked"
        );

        Vehicle storage vehicle = vehicles[_registrationNumber];
        uint256 parkingStartTime = vehicle.parkingStartTime;
        uint256 parkingDuration = _parkingEndTime - parkingStartTime;
        uint256 parkingCost = (parkingDuration *
            parkingAreas[_parkingAreaAddress].parkingRatePerHour) / 3600;

        require(msg.value >= parkingCost, "Insufficient payment");

        payable(_parkingAreaAddress).transfer(parkingCost);

        vehicle.isCurrentlyParked = false;

        emit VehicleParkedOut(
            _parkingAreaAddress,
            _registrationNumber,
            parkingDuration,
            parkingCost
        );
    }

    function getCurrentlyParkedVehicles(
        address _parkingAreaOwner
    ) external view returns (Vehicle[] memory) {
        ParkingArea storage parkingArea = parkingAreas[_parkingAreaOwner];

        uint256 count = 0;
        for (uint256 i = 0; i < vehiclesRegistrationNumbers.length; i++) {
            if (
                vehicles[vehiclesRegistrationNumbers[i]].isCurrentlyParked &&
                vehicles[vehiclesRegistrationNumbers[i]].parkingAreaAddress ==
                parkingArea.parkingAreaAddress
            ) {
                count++;
            }
        }
        Vehicle[] memory parkedVehicles = new Vehicle[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < vehiclesRegistrationNumbers.length; i++) {
            if (
                vehicles[vehiclesRegistrationNumbers[i]].isCurrentlyParked &&
                vehicles[vehiclesRegistrationNumbers[i]].parkingAreaAddress ==
                parkingArea.parkingAreaAddress
            ) {
                parkedVehicles[index] = vehicles[
                    vehiclesRegistrationNumbers[i]
                ];
                index++;
            }
        }
        return parkedVehicles;
    }

    function getAllParkings() public view returns (ParkingArea[] memory) {
        ParkingArea[] memory parkings = new ParkingArea[](
            parkingAreasAddresses.length
        );
        for (uint256 i = 0; i < parkingAreasAddresses.length; i++) {
            parkings[i] = parkingAreas[parkingAreasAddresses[i]];
        }
        return parkings;
    }

    function isParkingExist(address parkingAddress) public view returns (bool) {
        for (uint256 i = 0; i < parkingAreasAddresses.length; i++) {
            if (parkingAreasAddresses[i] == parkingAddress) {
                return true;
            }
        }
        return false;
    }
}
