import React, { useState } from 'react';
import { HoveredLink, Menu, MenuItem, ProductItem } from '../ui/navbar-menu';
import { cn } from "../../utils/cn";
import { AiOutlineUser, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineGift, AiOutlineBook } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

// Sample lang to edit mo na lang hehe
const MainNavbar = ({ className }) => {
    const [active, setActive] = useState(null);
  
    return (
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <HoveredLink href="/web-dev">Web Development</HoveredLink>
          <HoveredLink href="/interface-design">Interface Design</HoveredLink>
          <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
          <HoveredLink href="/branding">Branding</HoveredLink>
        </div>
        </MenuItem>
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
          description="Production ready Tailwind css components for your next project"
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
          description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
          />
        </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Utilities">
        <div className="grid grid-cols-3 gap-4 text-sm">
        <HoveredLink href="/hobby">

            <AiOutlineUser className="inline-block mr-2" /> Profile

        </HoveredLink>

        <HoveredLink href="/individual">

            <AiOutlineHeart className="inline-block mr-2" /> My Favorites

        </HoveredLink>

        <HoveredLink href="/team">

            <AiOutlineShoppingCart className="inline-block mr-2" /> Cart

        </HoveredLink>

        <HoveredLink href="/enterprise">

            <AiOutlineGift className="inline-block mr-2" /> Purchases

        </HoveredLink>

        <HoveredLink href="/enterprise">

            <AiOutlineBook className="inline-block mr-2" /> Reviews

        </HoveredLink>
        </div>
          </MenuItem>
        </Menu>
      </div>
    );
};
  
export default MainNavbar;