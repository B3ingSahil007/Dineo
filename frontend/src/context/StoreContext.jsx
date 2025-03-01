import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {
    const currency = "₹"
    // const url = "http://localhost:4000"
    const url = "https://dineo-backend.onrender.com"
    const delivery_fee = 50
    const platform_fee = 20
    const [cartItems, setCartItems] = useState({})
    const [isValidPromo, setIsValidPromo] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [promoCode, setPromoCode] = useState("");
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const promoCodes = {
        "SAVE15": 15,
        "FREESHIP": 5,
        "LUCKY25": 25,
        "MEGA20": 20,
        "FIRST50": 50,
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }
        return totalAmount
    }

    const applyPromoCode = () => {
        if (promoCodes[promoCode]) {
            setDiscount(promoCodes[promoCode]); // Apply discount
            setIsValidPromo(true);
        } else {
            setDiscount(0);
            setIsValidPromo(false);
        }
    };

    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } })
        setCartItems(response.data.cartData)
    }

    // useEffect(() => {
    //  console.log(cartItems);
    // }, [cartItems])

    useEffect(() => {
        async function loadData() {
            fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    }, [])

    const contextValue = { currency, delivery_fee, platform_fee, food_list, cartItems, setCartItems, addToCart, removeFromCart, getTotalCartAmount, applyPromoCode, isValidPromo, discount, promoCodes, promoCode, setPromoCode, url, token, setToken }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider