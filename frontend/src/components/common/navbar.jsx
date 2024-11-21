import React, { useState, useEffect } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from '../ui/navbar-menu';
import { cn } from "../../utils/cn";
import { AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart , AiOutlineGift, AiOutlineBook, AiOutlineLogin, AiOutlineForm, AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkAuthStatus, handleLogout } from '../../utils/userauth';

const MainNavbar = ({ className }) => {
    const [active, setActive] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAuth = checkAuthStatus();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedAdmin = localStorage.getItem('isAdmin') === 'true';

        setIsAuthenticated(storedAuth);
        setUser(storedUser);
        setIsAdmin(storedAdmin);
    }, []);

    const logout = async () => {
        await handleLogout(setIsAuthenticated, setUser, setIsAdmin);
        toast.success('Logged out successfully!');
        navigate('/login');
    };

    return (
        <div className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>
                {/* Services */}
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <HoveredLink href="/web-dev">Web Development</HoveredLink>
                        <HoveredLink href="/interface-design">Interface Design</HoveredLink>
                        <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>

                {/* Products */}
                <MenuItem setActive={setActive} active={active} item="Products">
                    <div className="text-sm grid grid-cols-3 gap-10 p-4">
                        <ProductItem
                            title="Algochurn"
                            href="https://algochurn.com"
                            src="https://assets.aceternity.com/demos/algochurn.webp"
                            description="Prepare for tech interviews like never before."
                        />
                        <ProductItem
                            title="Tailwind Master Kit"
                            href="https://tailwindmasterkit.com"
                            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                            description="Production ready Tailwind CSS components for your next project."
                        />
                        <ProductItem
                            title="Moonbeam"
                            href="https://gomoonbeam.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                            description="Never write from scratch again. Go from idea to blog in minutes."
                        />
                        <ProductItem
                            title="Rogue"
                            href="https://userogue.com"
                            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI."
                        />
                    </div>
                </MenuItem>

                {/* Utilities */}
                <MenuItem setActive={setActive} active={active} item="Utilities">
                    <div className="grid grid-cols-4 gap-4 text-sm">
                        <HoveredLink href="/hobby">
                            <AiOutlineUser className="inline-block mr-2" /> Profile
                        </HoveredLink>
                        <HoveredLink href="/favorites">
                            <AiOutlineHeart className="inline-block mr-2" /> My Favorites
                        </HoveredLink>
                        <HoveredLink href="/purchases">
                            <AiOutlineGift className="inline-block mr-2" /> Purchases
                        </HoveredLink>
                        <HoveredLink href="/reviews">
                            <AiOutlineBook className="inline-block mr-2" /> Reviews
                        </HoveredLink>
                    </div>
                </MenuItem>
               <MenuItem setActive={setActive} active={active} item="Cart">
                    <ProductItem
                                    title="Algochurn"
                                    href="https://algochurn.com"
                                    src="https://assets.aceternity.com/demos/algochurn.webp"
                                    description="Prepare for tech interviews like never before."
                                />
                </MenuItem>

                {/* User Section */}
                {isAuthenticated ? (
                    <MenuItem setActive={setActive} active={active} item={`Hi, ${user?.name || 'User'}`}>
                        <div className="flex flex-col space-y-2 text-sm">
                            <HoveredLink href="/account">
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
                                <AiOutlineLogin className="inline-block mr-2" />Log In
                            </HoveredLink>
                            <HoveredLink href="/signup">
                            <AiOutlineForm className="inline-block mr-2"/> Sign Up
                            </HoveredLink>
                        </div>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

export default MainNavbar;
