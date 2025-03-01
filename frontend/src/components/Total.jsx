import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Total = () => {
    const { cartItems, getTotalCartAmount, currency, delivery_fee, platform_fee, isValidPromo, discount } = useContext(StoreContext);
    const navigate = useNavigate();
    const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);

    // Calculate total before discount
    const subTotal = getTotalCartAmount();
    const totalBeforeDiscount = subTotal + delivery_fee + platform_fee;

    // Calculate discounted total
    const discountAmount = (totalBeforeDiscount * discount) / 100;
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;

    return (
        <>
            {/* Cart Total Section */}
            <div className="cart-total flex-1 flex flex-col gap-3 shadow-lg rounded-lg p-3">
                <h2 className="text-purple-700 text-xl sm:text-2xl font-semibold">Cart Total</h2>
                <div className="mx-2">
                    <div className="cart-total-details flex justify-between text-gray-500">
                        <p>Sub Total</p>
                        <p>{currency}{subTotal.toFixed(2)}</p>
                    </div>
                    <hr className="my-2" />
                    <div className="cart-total-details flex justify-between text-gray-500">
                        <p>Platform Fee</p>
                        <p>{currency}{platform_fee.toFixed(2)}</p>
                    </div>
                    <hr className="my-2" />
                    <div className="cart-total-details flex justify-between text-gray-500">
                        <p>Delivery Fee</p>
                        <p>{currency}{delivery_fee.toFixed(2)}</p>
                    </div>
                    <hr className="my-2" />
                    {/* Discount Section */}
                    {isValidPromo && (
                        <>
                            <div className="cart-total-details flex justify-between text-green-600 font-semibold">
                                <p>Discount ({discount}%)</p>
                                <p>-{currency}{discountAmount.toFixed(2)}</p>
                            </div>
                            <hr className="my-2" />
                        </>
                    )}
                    <div className="cart-total-details text-lg flex justify-between text-gray-500">
                        <b>Total</b>
                        <b>{currency}{totalAfterDiscount.toFixed(2)}</b>
                    </div>
                </div>
                <button type="submit" disabled={isCartEmpty} onClick={() => navigate('/placeorder')} className={`border-none text-white bg-purple-700 hover:bg-purple-900 text-base py-2 px-4 rounded-lg w-full sm:w-auto mx-auto sm:mx-10 ${isCartEmpty ? "opacity-50 cursor-not-allowed" : ""}`}>PROCEED TO CHECKOUT</button>
            </div>
        </>
    )
}

export default Total
