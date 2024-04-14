import React, { useState } from 'react';
import Dashboard from '../utilities/Dashboard';
import { useNavigate } from 'react-router-dom';
import { isParkingExist } from '../parkingFrontend';

const LoginParking = () => {
    const [parkingAddress, setParkingAddress] = useState('');
    const navigate = useNavigate(); 

    const handleParkingAddressChange = (e) => {
        setParkingAddress(e.target.value);
    };

    const handleLogin = async () => {
        const flag = await isParkingExist(parkingAddress);
        if (flag) {
            navigate('/parkingarea');
            localStorage.setItem('parkingAddress',parkingAddress)
        } else {
            alert('Invalid parking address. Please try again.');
        }
    }

    return (
        <>
            <Dashboard title={'Parking Area Login'} />
            <div className='flex-center'>
                <div className="form">
                    <p id="heading">Login</p>
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
                    <button className="button3" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </>
    );
}

export default LoginParking;
