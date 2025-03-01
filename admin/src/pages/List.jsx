import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url, currency }) => {
    // const currency = "₹";
    // const url = 'http://localhost:4000';
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            // console.log(response.data);
            if (response.data.success) {
                setList(response.data.data)
            } else {
                toast.error(response.data.message || 'Error Loading Products List!!');
                setError("Failed to fetch list.");
            }
        } catch (error) {
            toast.error(error || 'Error Loading Products List!!');
            setError("Failed to fetch list.");
        } finally {
            setLoading(false);
        }
    }

    const removeFood = async (foodId) => {
        // console.log(foodId);
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList()
        if (response.data.success) {
            toast.success(response.data.message || "Food Removed Successfully")
        } else {
            toast.error(response.data.message || 'Error Removing Products!!');
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <>
            <div className="list add flex-col w-full">
                <p className="text-2xl font-semibold text-gray-500 text-center my-4">All Foods <span className='text-purple-600'>List</span></p>
                <div className="list-table">
                    <div className="list-table-format title hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] grid-cols-[1fr_3fr_1fr] items-center gap-[15px] sm:gap-[10px] px-[12px] py-[15px] border-1 border-gray-700 text-[13px] bg-gradient-to-r from-[#09122C] via-[#121d3f] to-purple-900">
                        <b>Image</b>
                        <b>Name</b>
                        <b>Category</b>
                        <b>Price</b>
                        <b>Action</b>
                    </div>
                    {/* Loading State */}
                    {loading && <p className="text-gray-500 mx-3">Loading list...</p>}

                    {/* Error State */}
                    {error && <p className="text-red-500 mx-3">{error}</p>}
                    {list.map((item, index) => {
                        return (
                            <div key={index} className='list-table-format grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] grid-cols-[1fr_3fr_1fr] items-center gap-[15px] sm:gap-[10px] px-[12px] py-[15px] border-1 border-gray-700 text-[13px] hover:bg-purple-700'>
                                <img className='w-[50px]' src={`${url}/images/` + item.image} alt="Food_Image" />
                                <p>{item.name}</p>
                                <p>{item.category}</p>
                                <p>{currency}{item.price}</p>
                                <p onClick={() => removeFood(item._id)} className='cursor-pointer text-red-500 hover:font-bold text-base ml-0 sm:ml-3 w-3'>X</p>
                            </div>
                        );
                    })}
                </div>
                {/* Message after all items */}
                <div className="py-4 text-center">
                    <p className="text-gray-400 italic text-sm sm:text-base">You've Reached The End Of The List . . .</p>
                </div>
            </div>
        </>
    )
}

export default List
