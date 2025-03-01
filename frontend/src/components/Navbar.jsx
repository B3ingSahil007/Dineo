import React, { useContext, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaCartArrowDown, FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const Navbar = ({ setShowLogin }) => {
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext)
    const [menu, setMenu] = useState("home");
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token")
        setToken("");
        toast.success("Logged out")
        navigate("/")
    }

    return (
        <div className="navbar shadow-md sticky-top top-0 bg-[#09122C] w-full">
            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-2 w-full lg:w-[80%]">
                {/* Logo */}
                <Link to='/' onClick={() => { setMenu("home"); window.scrollTo({ top: 0, behavior: "smooth" }) }}><h1 className="text-xl sm:text-2xl font-bold text-purple-600">Dineo</h1></Link>
                {/* Navbar Menu */}
                <ul className="hidden sm:flex space-x-6 sm:space-x-10 text-gray-500 font-medium text-sm sm:text-base">
                    <Link to='/' onClick={() => { setMenu("home"); window.scrollTo({ top: 0, behavior: "smooth" }) }} className={`hover:text-purple-600 cursor-pointer ${menu === 'home' ? "border-b-2 text-purple-600 border-purple-600" : ""}`}>Home</Link>
                    <a href='#explore-menu' onClick={() => setMenu("menu")} className={`hover:text-purple-600 cursor-pointer ${menu === 'menu' ? "border-b-2 text-purple-600 border-purple-600" : ""}`}>Menu</a>
                    <a href='#app-download' onClick={() => setMenu("mobileapp")} className={`hover:text-purple-600 cursor-pointer ${menu === 'mobileapp' ? "border-b-2 text-purple-600 border-purple-600" : ""}`}>Mobile App</a>
                    <a href='#footer' onClick={() => setMenu("contactus")} className={`hover:text-purple-600 cursor-pointer ${menu === 'contactus' ? "border-b-2 text-purple-600 border-purple-600" : ""}`}>Contact Us</a>
                </ul>
                {/* Right Section */}
                <div className="flex items-center space-x-4 sm:space-x-6">
                    {/* Search Icon */}
                    <IoIosSearch className="text-xl sm:text-2xl text-gray-500 cursor-pointer hover:text-purple-600" />
                    {/* Cart Icon */}
                    <div className="relative cursor-pointer">
                        <Link to='/cart'><FaCartArrowDown className="text-xl sm:text-2xl text-gray-500 hover:text-purple-600" /></Link>
                        <div className={`${getTotalCartAmount() === 0 ? "" : "absolute top-[-2px] right-[-3px] h-2 w-2 sm:h-3 sm:w-3 bg-red-600 rounded-full"}`}></div>
                    </div>
                    {/* Sign-Up Button */}
                    {!token ? (
                        <button onClick={() => setShowLogin(true)} className="border text-white px-3 sm:px-4 py-1 rounded-full shadow hover:bg-purple-700 text-sm sm:text-base" >Log In</button>
                    ) : (
                        <div className="navbar-profile relative group">
                            <div className='flex items-center gap-2'>
                                <FaRegCircleUser className="text-xl sm:text-xl text-gray-500 cursor-pointer hover:text-purple-700" />
                                <p className='text-gray-500 sm:flex hidden gap-1'>Welcome,<span className='text-purple-700 font-bold'>User</span></p>
                            </div>
                            <ul className="absolute hidden group-hover:flex flex-col gap-2 px-3 py-3 rounded border outline-[2px_solid_white] bg-[#09122C] right-0 z-[1] list-none">
                                <Link to='/myorders'>
                                    <li className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                                        <MdOutlineShoppingBag className="text-lg w-[20px] text-gray-500" />
                                        <span>Orders</span>
                                    </li>
                                </Link>
                                <hr className="border-gray-100" />
                                <li onClick={logout} className="flex items-center gap-2 cursor-pointer hover:text-purple-700">
                                    <IoLogOutOutline className="text-lg w-[20px] text-gray-500" />
                                    <span>LogOut</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Navbar;
