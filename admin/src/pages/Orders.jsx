import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = ({ url, currency }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const loadOrderData = async () => {
        try {
            const response = await axios.post(`${url}/api/order/list`);
            setOrders(response.data.orders.reverse() || []);
        } catch (error) {
            console.error("Error loading orders:", error);
            toast.error(error.response?.data?.message || "Something went wrong");
            setError("Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const response = await axios.post(url + '/api/order/status', { orderId, status });
            if (response.data.success) {
                toast.success(response.data.message);
                loadOrderData(); // Refresh the orders list
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const response = await axios.post(url + '/api/order/delete', { orderId });
            toast.success(response.data.message);
            loadOrderData();  // Refresh orders after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error(error.response?.data?.message || 'Failed to delete order');
        }
    };

    useEffect(() => {
        loadOrderData();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-6 px-2 flex-col w-full">
            <h1 className="text-2xl font-bold text-gray-500 mb-4 text-center">
                All <span className='text-purple-700'>Orders</span>
            </h1>

            {/* Loading & Error States */}
            {loading && <p className="text-gray-500">Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Orders List */}
            {!loading && !error && orders.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {orders.map((order, index) => (
                            <div key={index} className="bg-gray-900 shadow-md rounded-lg p-2 border border-gray-200 transition-all ease-linear">
                                {/* Clickable Header for Expanding */}
                                <div
                                    className='cursor-pointer'
                                    onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
                                >
                                    <h2 className="text-sm font-semibold text-gray-500">
                                        <span className='text-purple-700'>Order ID:</span> {order.orderId}
                                    </h2>
                                    <h2 className="text-sm text-purple-700">
                                        User ID: <span className="text-gray-500">{order.userId}</span>
                                    </h2>
                                </div>

                                {/* Expandable Details */}
                                {expandedOrder === index && (
                                    <>
                                        <hr className='my-2' />
                                        <p className="text-sm text-purple-700">User: <span className="font-medium text-gray-500">{order.address.firstName} {order.address.lastName}</span></p>
                                        <p className="text-sm text-purple-700">Email: <span className="font-medium text-gray-500">{order.address.email}</span></p>
                                        <p className="text-sm text-purple-700">Phone: <span className="font-medium text-gray-500">{order.address.phone}</span></p>
                                        <hr className='my-2' />

                                        <p className='text-purple-700'>ITEMS:</p>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center">
                                                <p className="text-sm text-gray-500">{item.name} x {item.quantity}</p>
                                                <p className="text-sm text-gray-500">{currency}{item.price * item.quantity}</p>
                                            </div>
                                        ))}
                                        <hr className='my-2' />

                                        <p className="text-sm text-purple-700">Address: <span className="font-medium text-gray-500">{order.address.street}</span></p>
                                        <p className="text-sm text-purple-700">City: <span className="font-medium text-gray-500">{order.address.city}</span></p>
                                        <p className="text-sm text-purple-700">State: <span className="font-medium text-gray-500">{order.address.state}</span></p>
                                        <p className="text-sm text-purple-700">ZipCode: <span className="font-medium text-gray-500">{order.address.zipCode}</span></p>
                                        <p className="text-sm text-purple-700">Country: <span className="font-medium text-gray-500">{order.address.country}</span></p>
                                        <hr className='my-2' />

                                        <p className="text-sm text-purple-700">Total Amount: <span className="font-medium text-gray-500">{currency}{order.amount}</span></p>
                                        <p className="text-sm text-purple-700">Items: <span className="font-medium text-gray-500">{order.items.length}</span></p>

                                        <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="border rounded p-1 text-gray-500 w-full mt-2 bg-transparent">
                                            <option className='bg-gray-800 text-white' value="">{order.status}</option>
                                            <option className='bg-gray-800 text-white' value="Pending">Pending</option>
                                            <option className='bg-gray-800 text-white' value="Preparing">Preparing</option>
                                            <option className='bg-gray-800 text-white' value="Ready for Pickup">Ready for Pickup</option>
                                            <option className='bg-gray-800 text-white' value="Out for Delivery">Out for Delivery</option>
                                            <option className='bg-gray-800 text-white' value="Delivered">Delivered</option>
                                            <option className='bg-gray-800 text-white' value="Cancelled">Cancelled</option>
                                            <option className='bg-gray-800 text-white' value="Returned">Returned</option>
                                        </select>


                                        {/* Order Status */}
                                        <div className="mt-2 flex items-center gap-2">
                                            <span className={`w-3 h-3 rounded-full ${order.status === "Delivered" ? "bg-green-500" : "bg-red-500"}`}></span>
                                            <span className="text-sm font-medium">{order.status}</span>
                                        </div>

                                        {/* Payment Status */}
                                        <p className="mt-2 text-sm text-gray-500">
                                            Payment: <span className={`font-medium ${order.payment ? "text-green-600" : "text-red-600"}`}>
                                                {order.payment ? "Paid" : "COD"}
                                            </span>
                                        </p>
                                        {order.status === "Delivered" && (
                                            <button
                                                onClick={() => deleteOrder(order.orderId)}
                                                className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                                            >
                                                Delete Order
                                            </button>
                                        )}

                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Message after all items */}
                    <div className="py-4 text-center">
                        <p className="text-gray-400 italic text-sm sm:text-base">You've Reached End Of Orders List . . .</p>
                    </div>
                </>
            ) : (
                !loading && <p className="text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default Orders;
