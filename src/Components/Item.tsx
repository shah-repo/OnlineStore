import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { formatNumberToCurrency } from '../common/Utils'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { makeStyles } from '@mui/styles';
import { useShoppingCart } from './context/ShopingCartContext';

export type ItemProps = {
    id: string
    name: string
    image: string
    price: string
}

const style = makeStyles(() => ({
    addButton: {
        flexGrow: 1,
    },
    removeButton: {
        textTransform: 'capitalize !important' as 'capitalize',
    },
    quantity: {
        marginRight: '5px !important',
    },
    cardAction: {
        justifyContent: 'center',
        flexDirection: 'column',
    },
    addRemoveButton: {
        padding: '8px !important',
        minWidth: '40px !important',
    },
}))
const Item: React.FC<ItemProps> = ({ id, name, image, price }) => {
    const classes = style()
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeItem } = useShoppingCart();
    const handleAddItem = () => {
        increaseItemQuantity(id)
    }

    const handleDecreaseItemQuantity = () => {
        decreaseItemQuantity(id)
    }
    const handleRemoveItem = () => {
        removeItem(id)
    }
    return (
        <Card>
            <CardMedia
                sx={{ height: 350 }}
                image={image}
                title="Latest book"
            />
            <CardContent >
                <Box display={'flex'} justifyContent={'space-between'}>
                    <Typography variant="h5" component="span">
                        {name}
                    </Typography>
                    <Typography color={'GrayText'} component="span">
                        {formatNumberToCurrency(price)}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions className={classes.cardAction} >
                {!getItemQuantity(id) && <Button variant='contained' className={classes.addButton} onClick={handleAddItem} size="large" startIcon={<AddIcon />}>Add To Cart</Button>}
                {Boolean(getItemQuantity(id)) && <>
                    <Box display={'flex'} alignItems={'center'}>
                        <Button variant='contained' size="small" className={classes.addRemoveButton} onClick={handleDecreaseItemQuantity}  ><RemoveIcon /></Button>
                        <Box margin={1.25}>
                            <Typography variant="h5" component="span" className={classes.quantity}>
                                {getItemQuantity(id)}
                            </Typography>
                            <Typography color={'GrayText'} component="span">
                                in cart
                            </Typography>
                        </Box>
                        <Button variant='contained' size="small" className={classes.addRemoveButton} onClick={handleAddItem} ><AddIcon /></Button>
                    </Box>
                    <Button variant='contained' size="small" className={classes.removeButton} onClick={handleRemoveItem} color='error'>Remove</Button>
                </>}
            </CardActions>
        </Card>
    )
}

export default Item