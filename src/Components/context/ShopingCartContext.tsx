import React, { createContext, useContext } from "react"

type ShoppingCartContext = {
    getItemQuantity: (id: string) => number
    getTotalItemsQuantity: () => number
    increaseItemQuantity: (id: string) => void
    decreaseItemQuantity: (id: string) => void
    removeItem: (id: string) => void
    getCartItems: () => CartItem[];
    open: () => void
    close: () => void
    isOpen: () => boolean
}

export const ShoppingCartContext = createContext<ShoppingCartContext>({} as ShoppingCartContext)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}
export type CartItem = {
    id: string
    quantity: number
}
