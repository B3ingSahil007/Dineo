import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({ url, currency }) => {
    // const currency = "₹";
    // const url = 'http://localhost:4000';
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        stars: "",
        category: "Salad",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("stars", Number(data.stars));
        formData.append("category", data.category);
        formData.append("image", image);

        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                stars: "",
                category: "Salad",
            });
            setImage(false);
            toast.success(response.data.message || "Food Added Successfully");
        } else {
            toast.error(response.data.message || "Error Adding Product");
        }
    };

    useEffect(() => {
        // console.log(data);
    }, [data])

    return (
        <>
            <div className='max-w-6xl mx-auto py-6 px-2 flex-col w-full'>
                <h1 className="text-2xl font-bold text-gray-500 mb-4 text-center">Add <span className='text-purple-700'>Items</span></h1>
            </div>
            <div className="add w-full flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-[90%] sm:max-w-lg p-6 shadow-lg rounded-lg">

                    {/* Upload Image */}
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-lg font-semibold text-gray-700">Upload Image</p>
                        <label htmlFor="image" className="cursor-pointer flex flex-col items-center justify-center w-30 h-30 border-2 border-dashed border-gray-400 rounded-lg p-2 hover:border-purple-500 transition">
                            {image ? (
                                <img className="rounded w-full h-full object-cover" src={URL.createObjectURL(image)} alt="Preview_Image" />
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-4xl text-gray-500 mb-2" />
                                    <span className="text-gray-600 text-sm">Click To Upload</span>
                                </>
                            )}
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                        </label>
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium">Product Name</label>
                        <input value={data.name} onChange={handleChange} type="text" name="name" placeholder="Enter Product Name..." className="bg-transparent border border-gray-300 p-2 rounded-lg outline-none focus:border-purple-500" required />
                    </div>

                    {/* Product Description */}
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 font-medium">Product Description</label>
                        <textarea value={data.description} onChange={handleChange} name="description" rows={4} placeholder="Enter Product Description..." className="bg-transparent border border-gray-300 p-2 rounded-lg outline-none focus:border-purple-500" required></textarea>
                    </div>

                    {/* Category & Price */}
                    <div className="flex flex-col sm:flex-row gap-3">

                        {/* Category */}
                        <div className="flex flex-col flex-1 gap-1">
                            <label className="text-gray-700 font-medium">Product Category</label>
                            <select value={data.category} onChange={handleChange} name="category" className="bg-transparent border border-gray-300 p-2 rounded-lg outline-none focus:border-purple-500">
                                <option className='bg-[#09122C]' value="Salad">Salad</option>
                                <option className='bg-[#09122C]' value="Rolls">Rolls</option>
                                <option className='bg-[#09122C]' value="Desert">Desert</option>
                                <option className='bg-[#09122C]' value="Sandwich">Sandwich</option>
                                <option className='bg-[#09122C]' value="Cake">Cake</option>
                                <option className='bg-[#09122C]' value="Pure Veg">Pure Veg</option>
                                <option className='bg-[#09122C]' value="Pasta">Pasta</option>
                                <option className='bg-[#09122C]' value="Noodles">Noodles</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col flex-1 gap-1">
                            <label className="text-gray-700 font-medium">Product Price</label>
                            <input value={data.price} onChange={handleChange} type="number" name="price" placeholder={`Enter price (e.g., ${currency}300)`} className="bg-transparent border border-gray-300 p-2 rounded-lg outline-none focus:border-purple-500" required />
                        </div>
                    </div>

                    {/* Stars */}
                    <div className="flex flex-col flex-1 gap-1">
                        <label className="text-gray-700 font-medium">Product Ratings</label>
                        <input value={data.stars} onChange={handleChange} type="number" name="stars" placeholder={`Enter Ratings (e.g., 2, 3, 4)`} className="bg-transparent border border-gray-300 p-2 rounded-lg outline-none focus:border-purple-500" required />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-purple-700 text-white p-2 rounded-lg font-semibold hover:bg-purple-900 transition">Add Product</button>
                </form>
            </div>
        </>
    );
};

export default Add;
