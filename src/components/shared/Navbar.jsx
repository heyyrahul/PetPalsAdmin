import { Fragment, useEffect, useState } from "react";
import {
  PencilIcon,
  ChevronDownIcon,
  CreditCardIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid";
import { BellIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Menu, Transition, Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { RxTextAlignLeft, RxChevronLeft } from 'react-icons/rx';
import MobileSideBar from "./MobileSideBar";
import { BiLogOut } from 'react-icons/bi'; 
import axios from 'axios';
export default function Navbar() {

  const [showSidebar,setShowSidebar] = useState(false);
    const [pendingApplications, setPendingApplications] = useState(0);
    const handleCloseSidebar = () => {
      setShowSidebar(false);
    };


    useEffect(() => {
      const fetchPendingApplications = async () => {
        try {
          const response = await axios.get('https://rich-gray-lovebird-tux.cyclic.app/application');
          const pendingApps = response.data.application.filter(app => app.status === 'Applied').length;
          setPendingApplications(pendingApps);
        } catch (error) {
          console.error('Error fetching pending applications:', error);
        }
      };
  
      fetchPendingApplications();
    }, []);
  return (
    <div className='fixed w-full bg-white h-16 flex justify-between lg:justify-end items-center transition-all duration-[400ms] lg:pl-56'>
      <div className="pl-4 lg:hidden">
      <RxTextAlignLeft
        className="h-8 w-8 text-gray-700 cursor-pointer"
        onClick={() => setShowSidebar(true)}
      />
      </div>

      <div className="flex items-center pr-4">
      <Popover className="relative">
      <Popover.Button className="outline-none mr-5 md:mr-8 cursor-pointer text-gray-700 relative">
  <BellIcon className="h-6 w-6" />
  {pendingApplications > 0 && (
    <span className="absolute -top-1 -right-1 bg-red-500 text-red rounded-full w-3 h-4 flex justify-center items-center text-xs font-bold">
      {pendingApplications}
    </span>
  )}
</Popover.Button>

    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform scale-95"
      enterTo="transform scale-100"
      leave="transition ease-in duration=75"
      leaveFrom="transform scale-100"
      leaveTo="transform scale-95"
    >
      <Popover.Panel className="absolute -right-16 sm:right-4 z-50 mt-2 bg-white shadow-custom rounded max-w-xs sm:max-w-sm w-screen">
        <div className="relative p-3">
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-700 font-medium">Notifications</p>
            <a className="text-sm text-orange-500" to=' /' >
              Mark all as read
            </a>
          </div>
          <div className="mt-4 grid gap-4 grid-cols-1 overflow-hidden">
            {/* Notification items */}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  </Popover>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-custom"
                  alt="profile picture"
                />
              </picture>
              <span className="hidden md:block font-medium text-gray-700">
                Admin
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-custom">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    to='/' 
                    className="flex hover:bg-secondary-400 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to='/' 
                    className="flex hover:bg-secondary-400 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <Cog8ToothIcon className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to='/' 
                    className="flex hover:bg-secondary-400 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                      <BiLogOut className="h-4 w-4 mr-2"  />
                    Signout
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <MobileSideBar handleCloseSidebar={handleCloseSidebar} visible={showSidebar}/>
    </div>
  );
}
 