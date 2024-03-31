import React from 'react';
import SideBar from './SideBar';

const MobileSideBar = ({ visible, handleCloseSidebar }) => {
    const handleCloseModal = (e) => {
      if (e.target.id === "container") handleCloseSidebar();
    };
  
    if (!visible) {
      return null;
    }

    return (
        <div
        id="container"
        onClick={handleCloseModal}
        className="lg:hidden z-30 md:mt-10 lg:mt-0 fixed inset-0 bg-black bg-opacity-30 flex items-center justify-start"
      >
        <div className="relative w-64">
          <div className="bg-white  w-full h-screen ">
            <SideBar handleCloseSidebar={handleCloseSidebar}/>
          </div>
        </div>
      </div>
    );
};

export default MobileSideBar;