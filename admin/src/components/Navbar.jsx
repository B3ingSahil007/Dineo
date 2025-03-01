import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="navbar flex sticky-top justify-between items-center p-4 shadow-lg bg-[#09122C] w-full">
            {/* Logo */}
            <Link to="/">
                <h1 className="text-xl sm:text-2xl font-bold text-purple-600">Dineo</h1>
            </Link>

            {/* Profile Image */}
            <div className="profile">
                <FaUserCircle className="w-10 h-10 rounded-full border-1 border-white object-cover text-gray-600" />
            </div>
        </nav>
    );
};

export default Navbar;
