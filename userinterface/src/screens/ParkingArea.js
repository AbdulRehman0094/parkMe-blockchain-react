import React, { useState } from 'react'
import Dashboard from '../utilities/Dashboard'
import { getCurrentlyParkedVehicles } from '../parkingFrontend'
import { useEffect } from 'react'


const ParkingArea = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchCurrentlyParkedVehicles = async () => {
            try {
                const result = await getCurrentlyParkedVehicles(localStorage.getItem('parkingAddress'));
                setVehicles(result)
                console.log(result); 
            } catch (error) {
                console.error('Error fetching currently parked vehicles:', error);
            }
        };

        fetchCurrentlyParkedVehicles();
    }, []);
    return (
        <>
            <Dashboard title={'All Vehicles Parked'} />
            <div className='cards-container'>
                {vehicles.map((vehicle) => (<div class="card">
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
                </div>))}
            </div>
        </>
    )
}

export default ParkingArea