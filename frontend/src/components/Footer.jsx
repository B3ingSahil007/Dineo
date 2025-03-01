import React from 'react';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer bg-gray-900 flex flex-col items-center gap-6 py-4 px-6 sm:px-[10vw] md:px-[8vw] shadow-2xl" id="footer">
            <div className="footer-content w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Left Section */}
                <div className="footer-content-left flex flex-col items-start">
                    <h1 className="text-3xl font-bold text-purple-600">Dineo</h1>
                    <p className="mt-3 text-gray-500">Explore delicious recipes and meals crafted with love. Stay connected with us through our social platforms!</p>
                    <div className="footer-social-icons flex gap-4 mt-3">
                        <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:text-blue-800 transition duration-300" ><FaLinkedin /></a>
                        <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-700 text-2xl hover:text-black transition duration-300" ><FaGithub /></a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 text-2xl hover:text-pink-800 transition duration-300" ><FaInstagram /></a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:text-blue-800 transition duration-300" ><FaFacebook /></a>
                    </div>
                </div>
                {/* Center Section */}
                <div className="footer-content-center flex flex-col items-start">
                    <h2 className="text-xl font-semibold text-purple-600 mb-3">Company</h2>
                    <ul className="text-gray-500 space-y-1">
                        <li className="hover:text-purple-600 transition duration-300 cursor-pointer list-none">Home</li>
                        <li className="hover:text-purple-600 transition duration-300 cursor-pointer list-none">About Us</li>
                        <li className="hover:text-purple-600 transition duration-300 cursor-pointer list-none">Delivery</li>
                        <li className="hover:text-purple-600 transition duration-300 cursor-pointer list-none">Privacy Policy</li>
                    </ul>
                </div>
                {/* Right Section */}
                <div className="footer-content-right flex flex-col items-start">
                    <h2 className="text-xl font-semibold text-purple-600 mb-3">Get in Touch</h2>
                    <ul className="text-gray-500 space-y-1">
                        <li className="hover:text-purple-600 transition  duration-300 cursor-pointer list-none">+91-9638473047</li>
                        <li className="hover:text-purple-600 transition  duration-300 cursor-pointer list-none">chhipasahil163@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* Footer Bottom */}
            <div className="mt-3 w-full border-t border-purple-700 pt-4 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Dineo. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
