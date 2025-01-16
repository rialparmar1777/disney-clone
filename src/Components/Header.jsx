import React, { useState } from 'react';
import logo from './../assets/Images/logo.png';
import {
  HiHome,
  HiMagnifyingGlass,
  HiStar,
  HiPlayCircle,
  HiTv,
} from 'react-icons/hi2';
import { HiPlus, HiDotsVertical } from 'react-icons/hi';
import HeaderItem from './HeaderItem';

function Header() {
  const [toggle, setToggle] = useState(false);
  const menu = [
    { name: 'HOME', icon: HiHome },
    { name: 'SEARCH', icon: HiMagnifyingGlass },
    { name: 'WATCH LIST', icon: HiPlus },
    { name: 'ORIGINALS', icon: HiStar },
    { name: 'MOVIES', icon: HiPlayCircle },
    { name: 'SERIES', icon: HiTv },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#131520] shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <img src={logo} alt="Logo" className="w-[80px] md:w-[115px] object-cover" />

        {/* Menu Items */}
        <nav className="hidden md:flex gap-8 text-white">
          {menu.map((item) => (
            <HeaderItem key={item.name} name={item.name} Icon={item.icon} />
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          {menu.slice(0, 3).map((item) => (
            <HeaderItem key={item.name} name="" Icon={item.icon} />
          ))}
          <div className="relative" onClick={() => setToggle(!toggle)}>
            <HeaderItem name="" Icon={HiDotsVertical} />
            {toggle && (
              <div className="absolute right-0 mt-2 bg-[#1a1a1a] rounded-md shadow-lg p-4 space-y-3">
                {menu.slice(3).map((item) => (
                  <HeaderItem key={item.name} name={item.name} Icon={item.icon} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <img
          src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
          alt="User Avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
    </header>
  );
}

export default Header;
