import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, setCartItems, url, currency, delivery_fee, platform_fee, isValidPromo, discount } = useContext(StoreContext)
  const navigate = useNavigate();
  const isCartEmpty = Object.values(cartItems).every((qty) => qty === 0);

  // Calculate total before discount
  const subTotal = getTotalCartAmount();
  const totalBeforeDiscount = subTotal + delivery_fee + platform_fee;

  // Calculate discounted total
  const discountAmount = (totalBeforeDiscount * discount) / 100;
  const totalAfterDiscount = totalBeforeDiscount - discountAmount;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  })
  const [paymentType, setPaymentType] = useState("Cash On Delivery");

  const handleChange = (e) => {
    const { name, value } = e.target
    setData((prevData) => ({
      ...prevData, [name]: value
    }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    try {
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item
          itemInfo["quantity"] = cartItems[item._id]
          orderItems.push(itemInfo)
        }
      })
      // console.log(orderItems);
      let orderData = {
        address: data,
        items: orderItems,
        amount: totalAfterDiscount.toFixed(2),
        paymentType,
      }

      // console.log('Order Data :', orderData);

      const response = await axios.post(url + '/api/order/place', orderData, { headers: { token } })
      // console.log("Response :", response.data);
      if (response.data.success) {
        toast.success('Order Placed Successfully');
        console.log('Order Placed Successfully');
        setCartItems({});
        navigate('/');
      } else {
        console.log("error");
        toast.error(response.data.message || 'Failed to place order');
      }

    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    // console.log(data);
    if (!token) {
      toast.error('Invalid User - Login First');
      navigate('/cart')
    } else if (getTotalCartAmount() === 70) {
      navigate('/cart')
    }
  }, [data, token])

  return (
    <>
      <section className="my-[30px] sm:my-[50px]">
        <h2 className="text-purple-700 text-3xl font-bold text-center sm:text-left mb-5">
          Shipping Information
        </h2>
        <form onSubmit={placeOrder} className="place-order flex justify-center flex-col md:flex-row gap-12 w-full max-w-6xl">
          {/* Left Section - Delivery Info */}
          <div className="place-order-left w-full md:w-1/2 bg-[#09122C] p-6 rounded-lg shadow-lg">
            <p className="title text-purple-700 text-xl sm:text-2xl font-semibold mb-4">Delivery Information</p>
            <div className="multi-fields grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input onChange={handleChange} value={data.firstName} type="text" name="firstName" placeholder="First Name" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
              <input onChange={handleChange} value={data.lastName} type="text" name="lastName" placeholder="Last Name" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
            </div>
            <input onChange={handleChange} value={data.email} type="email" name="email" placeholder="E-Mail Address" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
            <input onChange={handleChange} value={data.street} type="text" name="street" placeholder="Street" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
            <div className="multi-fields grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input onChange={handleChange} value={data.city} type="text" name="city" placeholder="City" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
              <input onChange={handleChange} value={data.state} type="text" name="state" placeholder="State" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
            </div>
            <div className="multi-fields grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input onChange={handleChange} value={data.zipCode} type="text" name="zipCode" placeholder="Zip Code" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
              <input onChange={handleChange} value={data.country} type="text" name="country" placeholder="Country" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
            </div>
            <input onChange={handleChange} value={data.phone} type="number" name="phone" placeholder="Phone" required className="input-field w-full p-2 border-1 border-gray-500 rounded-md outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-700 bg-transparent mb-2" />
          </div>
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
            <div className="mb-3">
              <label className="text-gray-500">Payment Method:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mt-2">
                {["Cash On Delivery", "Credit Card", "Google Pay", "Paytm"].map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="paymentType" value={method} checked={paymentType === method} onChange={(e) => setPaymentType(e.target.value)} className="form-radio accent-purple-700 focus:ring-purple-500" />
                    <span className="text-gray-700">{method}</span>
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" disabled={isCartEmpty} className={`border-none text-white bg-purple-700 hover:bg-purple-900 text-base py-2 px-4 rounded-lg w-full sm:w-auto mx-auto sm:mx-10 ${isCartEmpty ? "opacity-50 cursor-not-allowed" : ""}`}>PLACE ORDER</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default PlaceOrder;
