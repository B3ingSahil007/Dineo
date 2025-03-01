import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = ({ url }) => {
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axios.post(`${url}/api/user/fetchuser`);
            // console.log("API Response:", response.data); // Debugging
            setUserData(response.data.data || []); // Ensure fallback to empty array
        } catch (error) {
            console.error("Error fetching users:", error);
            setError("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-6">
            <h1 className="text-2xl font-bold text-gray-500 mb-4 mx-2 text-center">All <span className='text-purple-600'>Users</span></h1>

            {/* Loading State */}
            {loading && <p className="text-gray-500 mx-3">Loading users...</p>}

            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Users Table */}
            {!loading && !error && userData.length > 0 ? (
                <>
                    <div className="overflow-x-auto shadow-md">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900 text-gray-500 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">USER ID</th>
                                    <th className="py-3 px-6 text-left">FirstName</th>
                                    <th className="py-3 px-6 text-left">LASTName</th>
                                    <th className="py-3 px-6 text-left">MOBILE</th>
                                    <th className="py-3 px-6 text-left">EMAIL</th>
                                    <th className="py-3 px-6 text-left">PASSWORD</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                                {userData.map((user, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-purple-700 hover:text-white">
                                        <td className="py-3 px-6">{user._id}</td>
                                        <td className="py-3 px-6">{user.firstname}</td>
                                        <td className="py-3 px-6">{user.lastname}</td>
                                        <td className="py-3 px-6">{user.mobileNumber}</td>
                                        <td className="py-3 px-6">{user.email}</td>
                                        <td className="py-3 px-6">{user.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Message after all items */}
                    <div className="py-4 text-center">
                        <p className="text-gray-400 italic text-sm sm:text-base">You've Reached End Of The User List . . .</p>
                    </div>
                </>
            ) : (
                !loading && <p className="text-gray-500">No users found.</p>
            )}
        </div>
    );
};

export default Users;
