import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { formatNumberToCurrency } from '../common/Utils';
import { makeStyles } from '@mui/styles';
import { CartItem as CartItemProps, useShoppingCart } from './context/ShopingCartContext';
import storeItemList from '../assets/data.json'
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemProps } from './Item';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    width: '140px',
    height: '80px',
});

const style = makeStyles(() => ({
    removeButton: {
        padding: '8px !important',
        minWidth: '40px !important',
    },
}))

const CartItem: React.FC<CartItemProps> = ({ id, quantity }) => {
    const classes = style()
    const { removeItem } = useShoppingCart()
    const item = storeItemList.find(({ id: itemId }) => itemId === id) as ItemProps
    const handleRemoveItem = () => {
        removeItem(id)
    }
    const getTotalPriceOfItem = () => {
        const price = Number(item.price);
        return price * quantity;
    }
    return (
        <div>
            <Paper
                sx={{
                    p: 2,
                    margin: '16px 0',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container flexWrap={'nowrap'} columnGap={2}>
                    <Grid item>
                        <ButtonBase>
                            <Img alt="complex" src={item?.image} />
                        </ButtonBase>
                    </Grid>
                    <Grid item container minWidth={280}>
                        <Grid item xs container alignItems={'center'} flexWrap={'nowrap'}>
                            <Grid item >
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    {item?.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatNumberToCurrency(item.price)} &nbsp; {`x${quantity}`}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item display={'flex'} alignItems={'center'} columnGap={1} >
                            <Typography variant="subtitle1" component="div">
                                {formatNumberToCurrency(getTotalPriceOfItem())}
                            </Typography>
                            <Button variant="outlined" onClick={handleRemoveItem} className={classes.removeButton}>
                                <DeleteIcon />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default CartItem
