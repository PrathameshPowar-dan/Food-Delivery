import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "./axios";


export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    };

    const [LOGGEDIN, setLOGGEDIN] = useState(false);

    const [food_list, setFOODLIST] = useState([])

    const FoodList = async()=>{
        const response = await axiosInstance.get('/food/list');
        if (response.data.success) {
            setFOODLIST(response.data.data);
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }

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

    useEffect(()=>{
       FoodList()
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        LOGGEDIN,
        setLOGGEDIN
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

