import React, {useState} from "react";
import {Transition} from "@headlessui/react";

const ModalStyle = ({handleCloseModal, visible}) => {


    const handleClose = (e) => {
        if (e.target.id === "container") 
        handleCloseModal();
        };
    if (!visible) {
        return null;
    }
    return (

        <div
        id="container"
        onClick={handleClose}
            className='z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='flex items-center justify-center'>
                <div className='bg-white rounded-[10px] relative w-1/2'>
                    <button
                        className="absolute top-1 right-1 shadow-custom bg-white hover:bg-primary-200 rounded-[50%] bg-blue-500 text-black w-10 h-10"
                        onClick={handleCloseModal}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 text-gray-600  h-5 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    <div className="p-6">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque perspiciatis,
                            soluta voluptates qui quae labore placeat fugit reprehenderit consectetur odio
                            eaque similique repellat sit repudiandae? Quas delectus unde facilis obcaecati?</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalStyle;
