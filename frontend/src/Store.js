import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART" :
            const cartItems = [...state.cart.cartItems, action.payload];
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            return {...state, cart: {...state.cart, cartItems: cartItems}}
        case "UPDATE_CART_ITEM":
            const cartItemsUpdated = state.cart.cartItems.map(item => item._id == action.payload._id ? action.payload : item);
            localStorage.setItem("cartItems", JSON.stringify(cartItemsUpdated));
            return {...state, cart: {...state.cart, cartItems: cartItemsUpdated}}
        case "REMOVE_CART_ITEM":
            const cartItemsRemoved = state.cart.cartItems.filter(item => item._id != action.payload._id);
            localStorage.setItem("cartItems", JSON.stringify(cartItemsRemoved));
            return {...state, cart: {...state.cart, cartItems: cartItemsRemoved}}
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}