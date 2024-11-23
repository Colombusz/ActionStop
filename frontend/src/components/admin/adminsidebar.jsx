import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { GiFigurehead } from "react-icons/gi";
import { PiTruck } from "react-icons/pi";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { IoGift } from "react-icons/io5";
import { useUserStore } from '../store/zuser'; 

import { Sidebar, SidebarBody, DesktopSidebar, SidebarLink } from "../ui/sidebar";

const AdminSidebar = () => {
  const { fetchCurrentUser } = useUserStore();

  const [open, setOpen] = useState(true); // Sidebar starts open on desktop
  const [user, adminUser] = useState(null); // Current user

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser();
      adminUser(user);
    };
    fetchUser();
  }, [fetchCurrentUser]);

  // Sidebar Links
  const links = [
    { label: "Dashboard", to: "/admin", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Profile", to: "/profile", icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Orders", to: "/orders", icon: <PiTruck className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Figurines", to: "/admin/figurines", icon: <GiFigurehead className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Manufacturers", to: "/admin/manufacturers", icon: <MdOutlinePrecisionManufacturing className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Promos", to: "/admin/promos", icon: <IoGift className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Settings", to: "/settings", icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
    { label: "Logout", to: "/logout", icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
  ];

  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <DesktopSidebar>
        <SidebarBody className="flex flex-col justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto">
              <Logo open={open} />
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Admin User",
                  href: "#",
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 rounded-full"
                      alt="Avatar"
                    />
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </DesktopSidebar>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-auto p-2">
        {/* bg-[#E5C8EA] */}
        <DashboardContent />
      </div>
    </div>
  );
};

// Logo Component
const Logo = ({ open }) => (
  <a href="../../../public/ActionStop_Logo.png" className="font-normal flex items-center text-sm text-black py-1">
    <div className="h-5 w-6 bg-black dark:bg-white rounded-lg" />
    {open && (
      <span className="ml-1 font-medium text-black dark:text-white">ActionStop</span>
    )}
  </a>
);

// Dummy Dashboard Content
const DashboardContent = () => (
  <div className="">
    <div className="h-20 w-full rounded-lg bg-gray-200 dark:bg-neutral-800" />
    <div className="h-60 w-full rounded-lg bg-gray-200 dark:bg-neutral-800" />
    <div className="h-40 w-full rounded-lg bg-gray-200 dark:bg-neutral-800" />
  </div>
);

export default AdminSidebar;
