import React from 'react';

const promoCodes = {
    "SAVE15": 15,
    "FREESHIP": 5,
    "LUCKY25": 25,
    "MEGA20": 20,
    "FIRST50": 50,
};

const PromoCode = () => {
    return (
        <>
            <div className="w-full p-4">
                <h1 className="text-xl font-bold mb-4 text-center">Available <span className='text-purple-700'>Promo Codes</span></h1>
                <ul className="flex flex-wrap justify-center gap-4">
                    {Object.entries(promoCodes).map(([code, discount]) => (
                        <li key={code} className="p-2 border rounded bg-purple-700 text-black text-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                            <strong>{code}</strong> - {discount}% Off
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default PromoCode;
