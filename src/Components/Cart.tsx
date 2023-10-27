import React from 'react'
import { Box, Typography } from '@mui/material'
import ButtonBase from '@mui/material/ButtonBase';
import { formatNumberToCurrency } from '../common/Utils';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { makeStyles } from '@mui/styles';
import { useShoppingCart } from './context/ShopingCartContext';
import CartItem from './CartItem';
import storeItemList from '../assets/data.json'
import { ItemProps } from './Item';

const style = makeStyles(() => ({
    cartContainer: {
        margin: '16px',
    },
}))

const Cart = () => {
    const { close, getCartItems } = useShoppingCart();
    const classes = style()
    const getTotalAmountOfItems = () => {
        return getCartItems().reduce((totalAmount, cartItem) => {
            const item = storeItemList.find(({ id }) => id === cartItem.id) as ItemProps
            return totalAmount + (Number(item.price) * cartItem.quantity)
        }, 0)
    }
    return (
        <div className={classes.cartContainer}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant="h5" component="span">
                    Cart
                </Typography>
                <ButtonBase onClick={close} sx={{ width: 28, height: 28, borderRadius: '100%' }}>
                    <CloseOutlinedIcon />
                </ButtonBase>
            </Box>
            {getCartItems().map(item => (
                <CartItem {...item} />
            ))}
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant="h5" component="span">
                    Total: { formatNumberToCurrency(getTotalAmountOfItems())}
                </Typography>
            </Box>
        </div>
    )
}

export default Cart
