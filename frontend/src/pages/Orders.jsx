import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/frontend_assets/assets'

const Orders = () => {
    const { currency, url, token, delivery_fee, platform_fee } = useContext(StoreContext)
    const [data, setData] = useState([])

    const loadOrderData = async () => {
        try {
            const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } })
            setData(response.data.orders)
        } catch (error) {
            console.error('Error loading orders:', error)
            toast.error(error.response?.data?.message || 'Something went wrong')
        }
    }

    useEffect(() => {
        if (token) {
            loadOrderData()
        }
    }, [token])

    return (
        <div className="max-w-6xl mx-auto py-10 px-0 sm:px-4">
            <h2 className="text-2xl font-semibold text-gray-500 mb-4">My Orders :</h2>
            {data.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <p className="text-lg font-medium">You haven't placed any orders yet! 🍔</p>
                    <p className="mt-1">Craving something delicious? Browse our menu and enjoy your favorite meals delivered to your doorstep.</p>
                    <Link to={'/'} className='px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-900 transition-all ease-linear'>
                        <button className='mt-3'>
                            Order Now
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.slice().reverse().map((order, index) => (
                        <div key={index} className="bg-gray-900 shadow-lg rounded-lg p-3 border border-gray-200 flex flex-col h-full">
                            <div className="flex items-center gap-1 mb-3">
                                <img src={assets.parcel_icon} alt="Parcel Icon" className="w-10 h-10" />
                                <p className="text-gray-500 text-sm">Order ID: <span className="font-medium">{order.orderId}</span></p>
                            </div>

                            <div className="space-y-2 text-gray-500">
                                {order.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="flex justify-between items-center border-b pb-2">
                                        <p className="text-sm">{item.name} x {item.quantity}</p>
                                        <p className="font-medium">{currency}{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 text-sm text-gray-500">
                                <p><strong>Delivery & Platform Fee:</strong> {currency}{delivery_fee + platform_fee}</p>
                                <p><strong>Total Amount:</strong> {currency}{order.amount.toFixed(2)}</p>
                                <p><strong>Items:</strong> {order.items.length}</p>
                                <p className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${order.status === "Delivered" ? "bg-green-500" : "bg-red-700"}`}></span>
                                    <b className="text-gray-500">{order.status}</b>
                                </p>
                            </div>

                            <div className="mt-auto pt-4">
                                <button onClick={loadOrderData} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
                                    Track Order
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders
