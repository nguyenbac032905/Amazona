import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    cart: {
        shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
        paymentMethod: localStorage.getItem("paymentMethod") ? localStorage.getItem("paymentMethod") : "",
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
        case "CART_CLEAR":
            localStorage.removeItem("cartItems");
            return {...state, cart: {...state.cart, cartItems: []}}
        case "USER_SIGNIN":
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            localStorage.removeItem("userInfo");
            return {...state, userInfo: action.payload}
        case "USER_SIGNOUT":
            localStorage.removeItem("userInfo");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("shippingAddress");
            localStorage.removeItem("paymentMethod");
            return {...state, userInfo: null, cart: {cartItems: [], shippingAddress: {}, paymentMethod: ""}}
        case "SAVE_SHIPPING_ADDRESS":
            localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
            return {...state, cart: {...state.cart, shippingAddress: action.payload}}
        case "SAVE_PAYMENT_METHOD":
            localStorage.setItem("paymentMethod", action.payload);
            return {...state, cart: {...state.cart, paymentMethod: action.payload}}
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}