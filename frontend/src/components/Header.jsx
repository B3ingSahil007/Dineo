import React from 'react';

const Header = () => {
    return (
        <div className="header h-[45vw] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[34vw] my-6 mx-auto rounded-xl bg-[url('/header_img.png')] bg-cover relative bg-center bg-no-repeat" id='header'>
            <div className="header-content absolute flex flex-col items-start gap-4 sm:gap-6 md:gap-8 max-w-[90%] sm:max-w-[70%] md:max-w-[80%] lg:max-w-[45%] bottom-[10%] sm:bottom-[30%] left-[5vw] animate-fadeIn">
                <h2 className="text-[max(5vw,22px)] sm:text-[max(4vw,26px)] md:text-[max(3.5vw,30px)] font-medium text-white" style={{ textShadow: '5px 2px 5px black' }}>Order Your Favourite Food Here</h2>
                <p className="text-base sm:text-lg md:text-base text-white hidden sm:block" style={{ textShadow: '5px 2px 5px black' }}>Craving something delicious? Discover a wide variety of meals from the best restaurants near you. Order now and enjoy fast delivery with every bite!</p>
                <p className="text-base sm:text-lg md:text-base text-white hidden md:block" style={{ textShadow: '5px 2px 5px black' }}>Discover delicious meals and have them delivered to your doorstep in no time. Satisfaction guaranteed with every bite!</p>
                <button onClick={()=>window.scrollTo({ top: 200, behavior: "smooth" })} className="btn border flex sm:hidden text-white px-6 py-2 rounded-full hover:bg-purple-700 shadow-lg">View Menu</button>
            </div>
        </div>
    );
};

export default Header;
