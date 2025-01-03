"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, Hand, LayoutList, Settings } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

function SideNav() {
  const { user } = useKindeBrowserClient();
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutList,
      link: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      link: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      link: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Settings",
      icon: Settings,
      link: "/dashboard/settings",
    },
  ];

  // Fallback image URL
  const fallbackImage = "/path/to/default-avatar.png";

  return (
    <div className="border shadow-md h-screen p-5">
      <Image src="/logo.svg" alt="logo" width={180} height={50} />

      <hr className="my-5" />

      {/* Menu list */}
      {menuList.map((menu) => (
        <Link href={menu.link} key={menu.id}>
          <h2 className="flex items-center gap-3 cursor-pointer text-md p-4 text-slate-500 hover:bg-primary hover:text-white rounded-lg my-2 transition duration-200 ease-in-out">
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}

      {/* Profile Section */}
      <div className="flex gap-2 items-center bottom-5 fixed p-4">
        {/* Ensure src is never empty */}
        <Image
          src={user?.picture || fallbackImage} // Use fallback image if picture is unavailable
          alt="profile"
          width={35}
          height={35}
          className="rounded-full"
        />
        <div>
          <h2 className="text-sm font-bold">
            {user?.given_name} {user?.family_name}
          </h2>
          <h2 className="text-xs text-slate-400">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
