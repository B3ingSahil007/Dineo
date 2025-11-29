import React, { useContext } from 'react'
import { FaStar, FaRegStar } from "react-icons/fa";
import { StoreContext } from '../context/StoreContext';
import { IoAddOutline } from "react-icons/io5";
import { assets } from '../assets/frontend_assets/assets';

const FoodItem = ({ id, name, price, description, image, star }) => {
    const { currency, cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(i < star ? <FaStar key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    return (
        <>
            <div className="food-item w-full m-auto rounded-xl shadow-[0px_0px_20px_black] animate-fadeIn hover:scale-105 transition-all duration-[.5s]">
                <div className="food-item-image-container relative">
                    <img className='food-item-image rounded-tl-xl rounded-tr-xl w-full' src={url + "/images/" + image} alt="Product_Image" />
                    {!cartItems[id] ?
                        <>
                            <div onClick={() => addToCart(id)} className='add absolute bottom-4 right-4 cursor-pointer rounded-full flex bg-black transition-all hover:text-purple-600'>
                                <IoAddOutline className='text-2xl' />
                            </div>
                        </> :
                        <div className='food-item-counter absolute bottom-3 right-3 flex items-center gap-2 p-2 rounded-full bg-purple-700'>
                            <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} className='w-6 cursor-pointer' alt="Remove_Icon_Image" />
                            <p>{cartItems[id]}</p>
                            <img onClick={() => addToCart(id)} src={assets.add_icon_green} className='w-6 cursor-pointer' alt="Add_Icon_Image" />
                        </div>
                    }
                </div>
                <div className='food-item-info p-3'>
                    <div className="food-item-name-rating flex justify-between items-center mb-2">
                        <p className='text-base'>{name}</p>
                        <div className="text-purple-600 flex">{renderStars()}</div>
                    </div>
                    <p className='food-item-description text-gray-500 text-sm'>{description}</p>
                    <p className='food-item-price text-purple-600 text-xl font-medium my-2 mx-0'>{currency}{price}</p>
                </div>
            </div>
        </>
    )
}

export default FoodItem
