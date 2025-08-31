import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [LOGGEDIN, setLOGGEDIN] = useState(false);
    const [food_list, setFOODLIST] = useState([]);

    const FoodList = async () => {
        const response = await axiosInstance.get('/food/list');
        if (response.data.success) {
            setFOODLIST(response.data.data);
        }
    };

    const formatCartData = (cartData) => {
        const formattedCart = {};
        for (const itemId in cartData) {
            formattedCart[itemId] = cartData[itemId].quantity;
        }
        return formattedCart;
    };



    const addToCart = async (itemId) => {
        const newQuantity = cartItems[itemId] ? cartItems[itemId] + 1 : 1;
        setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

        if (LOGGEDIN) {
            const foodItem = food_list.find(food => food._id === itemId);
            if (foodItem) {
                await axiosInstance.post('/cart/add', {
                    itemId: itemId,
                    itemData: {
                        name: foodItem.name,
                        price: foodItem.price,
                        image: foodItem.image
                    }
                });
            }
        }
    };

    const removeFromCart = async (itemId) => {
        const newQuantity = cartItems[itemId] ? cartItems[itemId] - 1 : 0;
        setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

        if (LOGGEDIN) {
            await axiosInstance.post('/cart/remove', { itemId: itemId });
        }
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                const item = food_list.find(food => food._id === itemId);
                if (item) {
                    total += item.price * cartItems[itemId];
                }
            }
        }
        return total.toFixed(2);
    };

    const getCartCount = () => {
        return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    };

    const loadCartData = async () => {
        if (LOGGEDIN) {
            try {
                const response = await axiosInstance.get('/cart/get');
                if (response.data.success) {
                    setCartItems(formatCartData(response.data.data));
                }
            } catch (error) {
                console.error("Error loading cart data:", error);
            }
        }
    };

    useEffect(() => {
        FoodList();
    }, []);

    useEffect(() => {
        if (LOGGEDIN) {
            loadCartData();
        }
    }, [LOGGEDIN]);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getCartCount,
        LOGGEDIN,
        setLOGGEDIN,
        loadCartData
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};