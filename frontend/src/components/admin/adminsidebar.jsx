import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { GiFigurehead } from "react-icons/gi";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { IoGift } from "react-icons/io5";

import { Sidebar, SidebarBody, DesktopSidebar, SidebarLink } from "../ui/sidebar";

const AdminSidebar = () => {
    // Sidebar Links
    const links = [
        { label: "Dashboard", to: "/admin", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
        { label: "Profile", to: "#", icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
        { label: "Figurines", to: "/admin/figurines", icon: <GiFigurehead className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
        { label: "Manufacturers", to: "/admin/manufacturers", icon: <MdOutlinePrecisionManufacturing className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
        { label: "Promos", to: "/admin/promos", icon: <IoGift className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
        { label: "Settings", to: "#", icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
        { label: "Logout", to: "#", icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5" /> },
      ];
      

  const [open, setOpen] = useState(true); // Sidebar starts open on desktop

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
      <div className="flex-1 p-6 bg-white dark:bg-neutral-900 overflow-auto">
        <DashboardContent />
      </div>
    </div>
  );
};

// Logo Component
const Logo = ({ open }) => (
  <a href="#" className="font-normal flex items-center text-sm text-black py-1">
    <div className="h-5 w-6 bg-black dark:bg-white rounded-lg" />
    {open && (
      <span className="ml-2 font-medium text-black dark:text-white">ActionStop</span>
    )}
  </a>
);

// Dummy Dashboard Content
const DashboardContent = () => (
  <div className="space-y-4">
    <div className="h-20 w-full rounded-lg bg-gray-200 dark:bg-neutral-800" />
    <div className="h-60 w-full rounded-lg bg-gray-200 dark:bg-neutral-800" />
    <div className="h-40 w-full rounded-lg bg-gray-200 dark:bg-neutral-800" />
  </div>
);

export default AdminSidebar;
