import React, { useState, useEffect } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem, CartItem, CheckoutSummary } from '../ui/navbar-menu';
import { cn } from "../../utils/cn";
import { AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineGift, AiOutlineBook, AiOutlineLogin, AiOutlineForm, AiOutlineSetting, AiOutlineLogout, AiOutlineStop } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkAuthStatus, handleLogout } from '../../utils/userauth';
import { Box } from '@mui/material';
import { updateQuantity } from '../store/cardSlices/add2cartSlice';
import { CardTravel } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { resetCartState } from '../store/cardSlices/add2cartSlice';
import { useDispatch } from 'react-redux';
import FilterPanel from '../ui/filteringPOREBER';

const MainNavbar = ({ className }) => {
    const [active, setActive] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        const storedAuth = checkAuthStatus();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedAdmin = localStorage.getItem('isAdmin') === 'true';

        setIsAuthenticated(storedAuth);
        setUser(storedUser);
        setIsAdmin(storedAdmin);
    }, []);

    // Handle logout
    const logout = async () => {
        dispatch(resetCartState());
        await handleLogout(setIsAuthenticated, setUser, setIsAdmin);
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    // Retrieve cart data from localStorage
    // 
    const Cart = useSelector((state) => state.cart);
    return (
        <div className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                {/* AboutUs */}
                <MenuItem item="AboutUs" href="/about" />

                {/* Products */}
                <MenuItem setActive={setActive} active={active} item="Products" href="/">
                    
                       <FilterPanel />
                 
                </MenuItem>

                {/* Utilities */}
                {isAuthenticated && (
                    <MenuItem setActive={setActive} active={active} item="Utilities">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <HoveredLink href="/user/favorite">
                                <AiOutlineHeart className="inline-block mr-2" /> My Favorites
                            </HoveredLink>
                            <HoveredLink href="/user/purchases">
                                <AiOutlineGift className="inline-block mr-2" /> Purchases
                            </HoveredLink>
                            <HoveredLink href="/user/reviewpage">
                                <AiOutlineBook className="inline-block mr-2" /> Reviews
                            </HoveredLink>
                        </div>
                    </MenuItem>
                )}

                {/* Cart */}
                {isAuthenticated && (
                    <MenuItem setActive={setActive} active={active} item="Cart">
                        <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {Array.isArray(Cart.cartItems) && Cart.cartItems.length > 0 ? (
                                    Cart.cartItems.map((figurine) => (
                                        <CartItem
                                            key={figurine.id}
                                            id={figurine.id}
                                        />
                                    ))
                                ) : (
                                    <div className="flex  items-center justify-center text-center p-2">
                                        <p className=" text-center text-gray-500 text-lg font-semibold">
                                            <AiOutlineStop className="inline-block mr-2"/> Your cart is empty! . . . . . . . . . .
                                        </p>
                                    </div>
                                )}
                            </div>
                            {Array.isArray(Cart.cartItems) && Cart.cartItems.length > 0 ? (
                                   <CheckoutSummary />
                                ) : (
                                    null
                                )}
                            
                        </div>
                    </MenuItem>
                )}

                {/* User Section */}
                {isAuthenticated ? (
                    <MenuItem setActive={setActive} active={active} item={`Hi, ${user?.firstname || 'User'}`}>
                        <div className="flex flex-col space-y-2 text-sm">
                            <HoveredLink href="/profile">
                                <AiOutlineSetting className="inline-block mr-2" /> Account Settings
                            </HoveredLink>
                            {isAdmin && <HoveredLink href="/admin/dashboard">Admin Dashboard</HoveredLink>}
                            <button onClick={logout} className="text-red-500 hover:text-red-700">
                                <AiOutlineLogout className="inline-block mr-2" /> Log Out
                            </button>
                        </div>
                    </MenuItem>
                ) : (
                    <MenuItem setActive={setActive} active={active} item="Log In">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <HoveredLink href="/login">
                                <AiOutlineLogin className="inline-block mr-2" /> Log In
                            </HoveredLink>
                            <HoveredLink href="/signup">
                                <AiOutlineForm className="inline-block mr-2" /> Sign Up
                            </HoveredLink>
                        </div>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default MainNavbar;
