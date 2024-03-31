import React from 'react';
import ModalStyle from '../components/shared/ModalStyle';
import {useState} from 'react';

const Modal = () => {
    const [isOpen,
        setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    return (
        <div>
            <button
                className='bg-primary-500 text-white px-4 py-2 rounded'
                onClick={handleOpenModal}>Open Modal</button>
            <p className='mt-4'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ex possimus
                suscipit dignissimos eius deleniti laborum nemo, aliquam quisquam dolore ipsam
                nisi porro ut ipsa sunt a in saepe aut maiores iste veniam quam rem nulla rerum.
                Nisi ea error, fuga ullam quidem perferendis? Sint obcaecati ipsam et modi
                reiciendis sunt nostrum, quasi, assumenda mollitia, sapiente repellendus
                cupiditate? Odio repellendus nam sequi eligendi numquam soluta debitis atque
                unde voluptates iure quibusdam minus hic, incidunt recusandae eveniet, aperiam
                molestiae consectetur libero. Ab voluptates sunt obcaecati quia odio itaque
                optio officia? Doloribus laudantium, nesciunt maxime est eligendi obcaecati
                minus dolor minima quia!
            </p>
            
            <div className="absolute top-0 right-0 w-full bg-black">
            <ModalStyle visible={isOpen} handleCloseModal={handleCloseModal}/>
            </div>
        </div>
    );
};

export default Modal;