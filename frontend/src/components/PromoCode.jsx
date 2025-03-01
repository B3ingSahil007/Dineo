import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const PromoCode = () => {
    const { applyPromoCode, isValidPromo, discount, promoCode, setPromoCode } = useContext(StoreContext);

    // Function to handle Enter key press
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            applyPromoCode();
        }
    };

    return (
        <>
            {/* Promo Code Section */}
            <div className="cart-promocode flex-1 rounded-lg shadow-lg p-3">
                <p className="text-purple-700 text-xl sm:text-2xl font-semibold">Enter Your Promo Code</p>
                <div className="cart-promocode-input mt-3 flex justify-between items-center rounded-lg gap-2">
                    <input className="bg-transparent border p-2 rounded-lg w-[80%] outline-none px-3" type="text" placeholder="Promo Code" value={promoCode} onChange={(e) => setPromoCode(e.target.value.toUpperCase())} onKeyDown={handleKeyDown} />
                    <button className="bg-purple-700 text-white p-2 rounded-lg border-none w-[30%] hover:bg-purple-900" onClick={applyPromoCode}>Apply</button>
                </div>
                {promoCode && (
                    <p className={`mt-2 text-sm ${isValidPromo ? "text-green-600" : "text-red-600"}`}>
                        {isValidPromo ? `Promo code applied! ${discount}% discount added.` : "Invalid promo code."}
                    </p>
                )}
            </div>
        </>
    );
};

export default PromoCode;
