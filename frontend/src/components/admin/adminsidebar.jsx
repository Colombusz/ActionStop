import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt
} from "@tabler/icons-react";
import { GiFigurehead } from "react-icons/gi";
import { PiTruck } from "react-icons/pi";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { IoGift } from "react-icons/io5";
import { toast } from 'react-toastify';
import Loading from '../common/loading';
import { Sidebar, SidebarBody, DesktopSidebar, SidebarLink } from "../ui/sidebar";
import { handleLogout } from '../../utils/userauth';

const AdminSidebar = () => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState({}); 
  const navigate = useNavigate();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/current-user', {withCredentials: true});
      setUser(data.user);
      // console.log("Data user:", data.user);
      setLoading(false);
      
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
      setLoading(false);
    }
  };

  // Logout Function
  const logout = async () => {
    try {
      await handleLogout(() => {}, setUser, () => {});
      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  // Sidebar Links
  const links = [
    { label: "Dashboard", to: "/admin", icon: <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Profile", to: "/admin/profile", icon: <IconUserBolt className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Orders", to: "/orders", icon: <PiTruck className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Figurines", to: "/admin/figurines", icon: <GiFigurehead className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Manufacturers", to: "/admin/manufacturers", icon: <MdOutlinePrecisionManufacturing className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Promos", to: "/admin/promos", icon: <IoGift className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Settings", to: "/settings", icon: <IconSettings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    {
      label: "Logout",
      to: "#", // Dummy link
      icon: <IconArrowLeft className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />,
      onClick: logout // Attach the logout function
    }
  ];

  return (
    <div className="flex h-screen">
      <Loading loading={loading} />
      <Sidebar open={open} setOpen={setOpen}>
        <DesktopSidebar>
          <SidebarBody className="flex flex-col justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto">
              <Logo open={open} />
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={link.onClick || null} // Handle custom click events
                  />
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: user.username? user.firstname +" "+ user.lastname : "Admin",
                  to: "/admin/profile",
                  icon: (
                    <img
                      src={user?.avatar || "https://via.placeholder.com/150"}
                      className="h-7 w-7 rounded-full"
                      alt="Avatar"
                    />
                  )
                }}
              />
            </div>
          </SidebarBody>
        </DesktopSidebar>
      </Sidebar>
      <div className="flex-auto p-2">
      </div>
    </div>
  );
};

// Logo Component
const Logo = ({ open }) => (
  <Link to="/admin" className="font-normal flex items-center text-sm text-black py-1">
    <div className="h-5 w-6 bg-black dark:bg-white rounded-lg" />
    {open && (
      <span className="ml-1 font-medium text-black dark:text-white">
        ActionStop
      </span>
    )}
  </Link>
);



export default AdminSidebar;
