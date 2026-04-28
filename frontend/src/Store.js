import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART" :
            return {...state, cart: {...state.cart, cartItems: [...state.cart.cartItems, action.payload]}}
        case "UPDATE_CART_ITEM":
            return {...state, cart: {...state.cart, cartItems: state.cart.cartItems.map(item => item._id == action.payload._id ? action.payload : item)}}
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}