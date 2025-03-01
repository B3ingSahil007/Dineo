import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="p-4 sm:p-10 text-gray-500 animate-fadeIn">
                <h2 className="text-2xl font-bold mb-2">Welcome, <span className='text-purple-600'>Admin!</span></h2>
                <p className="text-gray-500 mb-4 text-sm sm:text-base">
                    Here you can add and manage users, products and orders for your platform.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div onClick={() => navigate('/allusers')} className="bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 p-4 rounded-lg flex items-center shadow-md hover:scale-110 hover:animate-fadeIn transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-yellow-400 mr-4">
                            <i className="fas fa-users"></i>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold">All Users</h3>
                            <p className="text-sm text-gray-400">Add, edit, or remove users.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/add')} className="bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-blue-400 mr-4">
                            <i className="fas fa-box-open"></i>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold">Add Foods</h3>
                            <p className="text-sm text-gray-400">Upload product details.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/list')} className="bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-orange-400 mr-4">
                            <i className="fas fa-cogs"></i>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold">Manage Foods</h3>
                            <p className="text-sm text-gray-400">View, update, or add new products.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/orders')} className="bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-green-400 mr-4">
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                        <div>
                            <h3 className="text-base font-semibold">Manage Orders</h3>
                            <p className="text-sm text-gray-400">Track and update customer orders.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/coupons')} className="bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-red-400 mr-4">
                            <i className="fas fa-ticket-alt"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">All Coupons</h3>
                            <p className="text-sm text-gray-400">Create and track promotional codes.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/settings')} className="bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-gray-400 mr-4">
                            <i className="fas fa-cog"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Settings</h3>
                            <p className="text-sm text-gray-400">Adjust platform preferences.</p>
                        </div>
                    </div>
                    {/* <div onClick={() => navigate('/categories')} className="bg-gradient-to-r from-purple-700 to-purple-600 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-purple-400 mr-4">
                            <i className="fas fa-tags"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Manage Categories</h3>
                            <p className="text-sm text-gray-400">Organize products by categories.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/reports')} className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-blue-400 mr-4">
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">View Reports</h3>
                            <p className="text-sm text-gray-400">Analyze sales and performance metrics.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/support')} className="bg-gradient-to-r from-teal-700 to-teal-600 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-teal-400 mr-4">
                            <i className="fas fa-headset"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Customer Support</h3>
                            <p className="text-sm text-gray-400">Resolve queries and issues.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/inventory')} className="bg-gradient-to-r from-indigo-700 to-indigo-600 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-indigo-400 mr-4">
                            <i className="fas fa-warehouse"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Inventory Management</h3>
                            <p className="text-sm text-gray-400">Monitor and update stock levels.</p>
                        </div>
                    </div>
                    <div onClick={() => navigate('/feedback')} className="bg-gradient-to-r from-yellow-700 to-yellow-600 p-4 rounded-lg flex items-center shadow-md hover:scale-110 transition-all ease-in-out cursor-pointer" >
                        <div className="text-4xl text-yellow-400 mr-4">
                            <i className="fas fa-comments"></i>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">User Feedback</h3>
                            <p className="text-sm text-gray-400">Review and respond to customer feedback.</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Welcome
