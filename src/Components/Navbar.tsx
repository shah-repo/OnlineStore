import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { makeStyles } from '@mui/styles';
import { useShoppingCart } from './context/ShopingCartContext';

const navItems = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }, { name: 'Store', path: '/store' }];

const useStyles = makeStyles(() => ({
    cartContainer: {
        borderRadius: '100%',
        border: '1px solid #fff',
        width: '35px',
        height: '35px',
        position: 'relative',
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'space-around',
        '&:hover': {
            background: 'white',
            color: '#1976d2',
        }
    },
    countIndicator: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        transform: `translate(10px, 10px)`,
        background: 'red',
        color: '#fff',
        borderRadius: '100%',
        width: '22px',
        height: '22px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
}))

export const Navbar: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleNavigation = (path: string) => {
        navigate(path)
    }
    const { open, getTotalItemsQuantity } = useShoppingCart();

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" position='sticky'>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            SF Cart
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <Button key={item.name} onClick={() => handleNavigation(item.path)} sx={{ color: '#fff' }}>
                                    {/* <Link to={item.path}>{item.name}</Link> */}
                                    {item.name}
                                </Button>
                            ))}
                        </Box>
                        {Boolean(getTotalItemsQuantity()) && <Box className={classes.cartContainer} sx={{ml: 2}} onClick={open} >
                            <ShoppingCartOutlinedIcon />
                            <div className={classes.countIndicator}>{getTotalItemsQuantity()}</div>
                        </Box>}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}
