import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { food_list, cartItems, removeFromCart, currency, url } = useContext(StoreContext);

  return (
    <>
      <div className="cart my-[30px] sm:my-[50px]">
        <h2 className="text-purple-700 text-3xl font-bold text-center sm:text-left mb-5">
          Shopping Cart
        </h2>
        <div className="cart-items">
          <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_0.5fr] sm:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-purple-700 text-xs sm:text-base">
            <p>Items</p>
            <p>Title</p>
            <p className='hidden sm:flex'>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item grid grid-cols-[1fr_1.5fr_1fr_1fr_0.5fr] sm:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 mx-0 sm:mx-[10px] my-2 text-xs sm:text-base'>
                    <img className='w-[30px] sm:w-[70px] rounded-lg' src={url + "/images/" + item.image} alt="Product_Item_Image" />
                    <p className='w-16 sm:w-full'>{item.name}</p>
                    <p className='-ml-3 hidden sm:flex'>{currency}{item.price}</p>
                    <p className=''>{cartItems[item._id]}</p>
                    <p className='-ml-4'>{currency}{(item.price * cartItems[item._id]).toFixed(2)}</p>
                    <p onClick={() => removeFromCart(item._id)} className='hover:text-red-700 cursor-pointer font-bold w-0'>X</p>
                  </div>
                  <hr className='h-[1px] bg-purple-700 border-none' />
                </div>
              );
            }
          })}
        </div>
        <CartTotal />
      </div>
    </>
  );
};

export default Cart;
