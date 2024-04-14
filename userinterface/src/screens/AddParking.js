import React, { useState } from 'react';
import Dashboard from '../utilities/Dashboard';
import { Link } from 'react-router-dom';
import { registerParkingArea } from '../parkingFrontend';

const AddParking = () => {
    const [parkingAddress, setParkingAddress] = useState('');
    const [parkingName, setParkingName] = useState('');
    const [pricePerHour, setPricePerHour] = useState('');

    const handleParkingAddressChange = (e) => {
        setParkingAddress(e.target.value);
    };

    const handleParkingNameChange = (e) => {
        setParkingName(e.target.value);
    };

    const handlePricePerHourChange = (e) => {
        setPricePerHour(e.target.value);
    };

    const addHandle = async () => {
        try {
            await registerParkingArea(parkingName, pricePerHour, parkingAddress);
            alert('Added successful');
        } catch (error) {
            console.error('Error adding parking:', error);
            alert('Error adding parking. Please try again.');
        }
    };

    return (
        <>
            <Dashboard title={'Add Parking'} />
            <div className='flex-center'>
                <div className="form">
                    <p id="heading">Register Parking</p>
                    <div className="field">
                        <input 
                            autoComplete="off" 
                            placeholder="Parking Address" 
                            className="input-field" 
                            type="text" 
                            value={parkingAddress} 
                            onChange={handleParkingAddressChange} 
                        />
                    </div>
                    <div className="field">
                        <input 
                            placeholder="Parking Name" 
                            className="input-field" 
                            type="text" 
                            value={parkingName} 
                            onChange={handleParkingNameChange} 
                        />
                    </div>  
                    <div className="field">
                        <input 
                            placeholder="Price per Hour" 
                            className="input-field" 
                            type="number" 
                            value={pricePerHour} 
                            onChange={handlePricePerHourChange} 
                        />
                    </div>             
                    <Link to='/loginparking' className='link'>
                        <button className="button3" onClick={addHandle}>Register Parking</button>
                    </Link>
                    <div className='fld'>
                    <Link to='/loginparking' className=' none'>
                    <p>Click here to Login</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddParking;
