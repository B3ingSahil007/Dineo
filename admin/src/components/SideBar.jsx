import React from 'react'
import { IoIosAddCircleOutline, IoIosList, IoMdCart, IoMdSettings } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const SideBar = () => {
  return (
    <>
      <div style={{ borderTop: '0', borderLeft: '0', borderBottom: '0' }} className="sidebar w-[16%] sm:w-[18%] min-h-[100vh] h-screen border-1 border-t-0 border-purple-600">
        <div className="sidebar-options pt-[50px] pl-[20%] flex flex-col gap-[20px] text-gray-500">
          <NavLink to='/' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <FaHome className='text-lg' />
            <p className='hidden sm:block'>Home</p>
          </NavLink>
          <NavLink to='/allusers' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <i className="fas fa-users"></i>
            <p className='hidden sm:block'>All Users</p>
          </NavLink>
          <NavLink to='/add' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <IoIosAddCircleOutline className='text-lg' />
            <p className='hidden sm:block'>Add Items</p>
          </NavLink>
          <NavLink to='/addrestaurants' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <i className="fas fa-ticket-alt"></i>
            <p className='hidden sm:block'>Add Restaurants</p>
          </NavLink>
          <NavLink to='/allrestaurants' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <i className="fas fa-ticket-alt"></i>
            <p className='hidden sm:block'>All Restaurants</p>
          </NavLink>
          <NavLink to='/list' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <IoIosList className='text-lg' />
            <p className='hidden sm:block'>List Items</p>
          </NavLink>
          <NavLink to='/orders' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <IoMdCart className='text-lg' />
            <p className='hidden sm:block'>All Orders</p>
          </NavLink>
          <NavLink to='/coupons' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <i className="fas fa-ticket-alt"></i>
            <p className='hidden sm:block'>Coupons</p>
          </NavLink>
          <NavLink to='/settings' style={{ borderRight: '0' }} className={({ isActive }) => `sidebar-option flex items-center gap-[12px] border-1 border-purple-600 px-[8px] py-[10px] rounded-s-md cursor-pointer ${isActive ? "bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-white" : ""}`}>
            <IoMdSettings className='text-lg' />
            <p className='hidden sm:block'>Settings</p>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default SideBar
