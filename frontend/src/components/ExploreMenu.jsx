import React from 'react';
import { menu_list } from '../assets/frontend_assets/assets.js';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className="explore-menu flex flex-col gap-4 py-6 sm:py-20" id="explore-menu">
            {/* Header Section */}
            <h1 className="text-purple-600 font-medium text-2xl sm:text-3xl">Explore Our Menu :</h1>
            <p className="explore-menu-text sm:max-w-[60%] max-w-[100%] sm:text-base text-sm text-gray-500">
                Dive into a world of flavors! From hearty meals to delightful desserts, our menu is crafted to satisfy your cravings and leave you wanting more. Explore now and indulge in your favorites!
            </p>
            {/* Menu List Section */}
            <div className="explore-menu-list flex items-center gap-3 sm:gap-5 justify-start sm:justify-center text-center overflow-x-auto">
                {menu_list &&
                    menu_list.map((item, index) => (
                        <div key={index} onClick={() => setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name))} className={`explore-menu-list-item cursor-pointer group flex flex-col items-center ${category === item.menu_name ? 'text-purple-600' : 'text-gray-500'}`} >
                            {/* Image */}
                            <img className={`w-[8vw] min-w-[70px] rounded-full border-2 ${category === item.menu_name ? 'border-purple-700 p-[4px] transition-all ease-linear' : 'border-gray-500'} group-hover:border-purple-700`} src={item.menu_image} alt="Menu_Item_Image" />
                            {/* Category Name */}
                            <p className={`mt-3 sm:text-lg text-base ${category === item.menu_name ? 'text-purple-600' : 'text-gray-500'} group-hover:text-purple-600`} > {item.menu_name} </p>
                        </div>
                    ))}
            </div>
            {/* Divider */}
            <hr className="my-1 mx-0 h-[2px] bg-purple-700 border-none" />
        </div>
    );
};

export default ExploreMenu;
