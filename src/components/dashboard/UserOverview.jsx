import React, { useState, useEffect } from 'react';
import { GiDogHouse } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { HiEmojiHappy } from 'react-icons/hi';
import URL from '../../../API.js';

const UserOverview = () => {
    const [totalPets, setTotalPets] = useState(0);
    const [totalAdopted, setTotalAdopted] = useState(0);
    const [totalFosters, setTotalFosters] = useState(0);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${URL}/pet`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                const pets = data.pets;
                const total = pets.length;
                const adopted = pets.filter(pet => pet.isAdopted).length;

                setTotalPets(total);
                setTotalAdopted(adopted);
            } catch (error) {
                console.error("Error fetching pet data:", error);
            }
        };

        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${URL}/application`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                const applications = data.application;
                const acceptedApplications = applications.filter(app => app.status === "Accepted");
                const totalFosters = new Set(acceptedApplications.map(app => app.userId)).size;

                setTotalFosters(totalFosters);
            } catch (error) {
                console.error("Error fetching application data:", error);
            }
        };

        fetchPets();
        fetchApplications();
    }, []);

    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-5 mb-6">
                <div className='bg-primary-900 rounded-[8px] p-6 text-white text-center space-y-2 shadow-custom'>
                    <GiDogHouse className='mx-auto text-3xl' />
                    <p className='text-lg'>Total Pets</p>
                    <h2 className='text-3xl font-semibold'>{totalPets}</h2>
                </div>
                <div className='bg-gray-500 rounded-[8px] p-6 text-white text-center space-y-2 shadow-custom'>
                    <FaHeart className='mx-auto text-3xl' />
                    <p className='text-lg'>Total Adopted</p>
                    <h2 className='text-3xl font-semibold'>{totalAdopted}</h2>
                </div>
                <div className='bg-secondary-400 rounded-[8px] p-6 text-white text-center space-y-2 shadow-custom'>
                    <HiEmojiHappy className='mx-auto text-3xl' />
                    <p className='text-lg'>Total Pet Parent</p>
                    <h2 className='text-3xl font-semibold'>{totalFosters}</h2>
                </div>
            </div>
        </div>
    );
};

export default UserOverview;
