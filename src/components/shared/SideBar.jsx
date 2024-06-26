import {RiLayoutGridFill} from 'react-icons/ri';
import { BsPeople, BsCardChecklist } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi'; 
import { GiPawHeart } from "react-icons/gi";
import { AiOutlineForm } from "react-icons/ai";

import CustomLink from "../../hooks/CustomLink";
import { Link } from 'react-router-dom';

const SideBar = ({ handleCloseSidebar }) => {

    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/';
  
    }
  return (
    <div className="fixed w-64 h-full " style={{backgroundColor:"white"}}>
      <div className=" mt-6 mb-14 pl-12">
        <Link to="/dashboard"> <picture>
          <img className="w-20 h-auto" src="./petpals.png" alt="company logo" />
        </picture></Link>
      </div>
      <div className="flex flex-col">
        <CustomLink onClick={handleCloseSidebar} to="/">
          {" "}   
          <button className="flex items-center gap-2" style={{color:"#31363F"}}>
            <RiLayoutGridFill className="text-xl" /> <span>Dashboard</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/pets">
          <button className="flex items-center gap-2" style={{color:"#31363F"}}>
            <GiPawHeart  className="text-xl" /> <span>Pets</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/forms">
          <button className="flex items-center gap-2" style={{color:"#31363F"}}>
            <AiOutlineForm /> <span>Master</span>
          </button>
        </CustomLink>
        <CustomLink onClick={handleCloseSidebar} to="/table">
    <button className="flex items-center gap-2" style={{ color: "#31363F" }}>
     <BsPeople />
      <span>Users</span>
      </button>
        </CustomLink>
    
        <CustomLink onClick={handleLogout} to="/">
  <button className="flex items-center gap-2" onClick={ handleLogout} >
    <BiLogOut /> 
    <span style={{color:"#31363F"}} >SignOut</span>
   
  </button>
</CustomLink>
      </div>
    </div>
  );
};

export default SideBar;
