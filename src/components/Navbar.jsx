import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from './login/slices'
import { Badge, CircularProgress, Divider } from '@mui/material';


function MainNavbar() {
    const [openMenu, setOpenMenu] = useState(null);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    //Check if user logged in or not
    const user = useSelector((state) => state.loginUser)
    //Cart used to show numbers of products the cart currently have
    const cart = useSelector((state) => state.manageHome.cart)

    const handleLogout = () => {
        dispatch(userSlice.actions.logoutUser())
    }

    const handleMenu = (event) => {
        setOpenMenu(event.currentTarget);
    };

    const handleClose = () => {
        setOpenMenu(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>MY SHOP</Link>
                    </Typography>
                    <IconButton color="inherit" sx={{ marginRight: 3/2, backgroundColor: 'secondary.main' }} onClick={() => { navigate(`/cart`) }}>
                        <Badge badgeContent={cart.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    {user.status === 'loading' ? <CircularProgress color="inherit" /> :
                        <>
                            {!user.user.login ?
                                <Button><Link to="/login" style={{ color: 'white', textDecoration: 'none' }}><strong>SIGN IN</strong></Link></Button>
                                :
                                <div>
                                    <IconButton onClick={handleMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.user.name} src={user.user.avatar} imgProps={{ referrerPolicy: "no-referrer" }} />
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        sx={{ mt: '45px' }}
                                        anchorEl={openMenu}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        open={Boolean(openMenu)}
                                        onClose={handleClose}
                                    >
                                        {user.user.role === "ADMIN" ?
                                            <MenuItem key="Dashboard" onClick={handleClose}>
                                                <Link to="/dashboard" style={{ color: 'black', textDecoration: 'none' }}><Button>DASHBOARD</Button></Link>
                                            </MenuItem>
                                            :
                                            <MenuItem key="Order" onClick={handleClose}>
                                                <Link to="/orders" style={{ color: 'black', textDecoration: 'none' }}><Button>YOUR ORDERS</Button></Link>
                                            </MenuItem>
                                        }
                                        <Divider />
                                        <MenuItem key="Logout" onClick={handleClose}>
                                            <Button variant="text" style={{ color: 'black', textDecoration: 'none' }} onClick={handleLogout}>SIGN OUT</Button>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            }
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default MainNavbar;
