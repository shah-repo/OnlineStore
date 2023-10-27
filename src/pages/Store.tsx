import { Box, Drawer, Grid } from '@mui/material'
import React from 'react'
import itemList from '../assets/data.json'
import Cart from '../Components/Cart'
import { useShoppingCart } from '../Components/context/ShopingCartContext'
import Item from '../Components/Item'

export const Store: React.FC = () => {
  const { close, isOpen } = useShoppingCart()
  return (
    <>
      <div>
        <Box marginLeft={3} marginRight={3}>
          <h1>Store</h1>
          <Grid spacing={2} className={'containing-box-scrollbar'} overflow={'auto'} sx={{ height: '625px' }} container columns={{ xs: 4, sm: 9, md: 16, lg: 16 }} mb={.5}>
            {itemList.map(item => (
              <Grid item lg={4} md={4} sm={3} xs={2}>
                <Item {...item} />
              </Grid>
            ))}
          </Grid>
          <Drawer open={isOpen()} onClose={close} anchor={'right'} >
            <Cart />
          </Drawer>
        </Box>
      </div>
    </>
  )
}
