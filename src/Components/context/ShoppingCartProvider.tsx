import React, { PropsWithChildren, useState } from "react";
import { CartItem, ShoppingCartContext } from "./ShopingCartContext";

export const ShoppingCartProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)

    const open = () => {
        setOpenDrawer(true);
    }

    const close = () => {
        setOpenDrawer(false);
    }

    const isOpen = () => {
        return openDrawer;
    }

    const getItemQuantity = (id: string) => {
        return cartItems.find(item => item.id === id)?.quantity ?? 0
    }
    const increaseItemQuantity = (id: string) => {
        setCartItems(prev => {
            const item = prev.find(item => item.id === id)
            if (item) {
                return prev.map(item => (item.id === id) ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...prev, { id, quantity: 1 }]
        })
    }
    const decreaseItemQuantity = (id: string) => {
        setCartItems(prev => {
            const item = prev.find(item => item.id === id)
            if (item && item.quantity > 1) {
                return prev.map(item => (item.id === id) ? { ...item, quantity: item.quantity - 1 } : item)
            }
            return prev.filter(item => item.id !== id)
        })
    }
    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }
    const getTotalItemsQuantity = () => {
        return cartItems.reduce((totalQuantity, item) => {
            return totalQuantity + item.quantity;
        }, 0)
    }
    const getCartItems = () => {
        return cartItems;
    }
    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem, getTotalItemsQuantity, open, close, isOpen, getCartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}