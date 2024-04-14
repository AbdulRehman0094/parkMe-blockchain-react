import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllParkings, getCurrentlyParkedVehicles } from '../parkingFrontend';

const HomePage = () => {
    const [parkingAddress, setParkingAddress] = useState('');
    const [parkings, setParkings] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const result = await getAllParkings();
                setParkings(result);
                if (result.length > 0) {
                    setParkingAddress(result[0].parkingAreaAddress);
                }
            } catch (error) {
                console.error('Error fetching parkings:', error);
            }
        };

        fetchParkings();
    }, []);

    useEffect(() => {
        const fetchCurrentlyParkedVehicles = async () => {
            try {
                setLoading(true);
                const result = await getCurrentlyParkedVehicles(parkingAddress);
                setVehicles(result);
            } catch (error) {
                console.error('Error fetching currently parked vehicles:', error);
            } finally {
                setLoading(false);
            }
        };

        if (parkingAddress) {
            fetchCurrentlyParkedVehicles();
        }
    }, [parkingAddress]);

    const handleParkingChange = (event) => {
        setParkingAddress(event.target.value);
    };

    return (
        <>
            <div className='homeheader'>
                <div>
                    <p>Select Parking:</p>
                    <select id="dropdown" value={parkingAddress} onChange={handleParkingChange}>
                        {parkings.map((parking) => (
                            <option key={parking.parkingAreaAddress} value={parking.parkingAreaAddress}>
                                {parking.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Link to='/addparking'>
                    <button className="btn-96"><span>Add Parking Area</span></button>
                </Link>
            </div>

            <div className='cards-container'>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    vehicles.map((vehicle) => (
                        <div className="card" key={vehicle.id}>
                            <div className="card__content">
                                <div className='grid'>
                                    <div className='bold'>Owner Address:<div className='simple'>{vehicle.owner}</div> </div>
                                </div>
                                <div className='grid'>
                                    <div className='bold'>Registration Number:<div className='simple'>{vehicle.registrationNumber}</div></div>
                                </div>
                                <div className='grid'>
                                    <div className='bold'>Parking Start Time<div className='simple'>{vehicle.parkingStartTime}</div></div>
                                </div>
                                <div className='grid'>
                                    <div className='bold'>Parking Adress<div className='simple'>{vehicle.parkingAreaAddress}</div></div>
                                </div>

                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default HomePage;
