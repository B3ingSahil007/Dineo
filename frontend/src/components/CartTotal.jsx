import React from 'react'
import PromoCode from './PromoCode';
import Total from './Total';

const CartTotal = () => {

    return (
        <>
            <div className="cart-bottom mt-20 flex flex-col-reverse lg:flex-row justify-between gap-[max(2vw,20px)]">
                <Total />
                <PromoCode />
            </div>
        </>
    )
}

export default CartTotal
