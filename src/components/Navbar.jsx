import React from "react";
import logo1 from "../assets/Icon Logo.svg";
import logo2 from "../assets/juicemaxLogo_navbar.svg";
import logo3 from "../assets/juicemaxLogo-1.svg";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ searchModelforMobile, set_searchModelforMobile }) => {
  const { themeClasses } = useTheme();

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="p-1  bg-white flex items-center justify-between">
      <div>
        <img className="w-25 hidden sm:block" src={logo2} />
        <div className="sm:hidden flex items-center">
          <img className="w-10" src={logo1} />
          <span className="text-xl text-[#e22d2c] font-black tracking-wide">
            JUICE{" "}
            <span className={`${themeClasses.text.accentGreen}`}>MAX</span>
          </span>
        </div>
      </div>

      <div className="hidden gap-3  sm:flex mr-3">
        <div
          onClick={() => set_searchModelforMobile(!searchModelforMobile)}
          className="p-2 rounded-full text-neutral-600 hover:text-[#e22d2c] hover:bg-[#e22d2c]/10 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <Search size={20} />
        </div>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="relative text-neutral-900 font-semibold text-sm px-4 py-2 rounded-full transition-all duration-200 hover:text-[#e22d2c] hover:bg-[#e22d2c]/8 group"
          >
            {link.name}

            {/* Animated underline using accent red */}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#e22d2c] rounded-full transition-all duration-300 group-hover:w-3/4" />
          </Link>
        ))}

        {/* Order Now CTA button — uses primary button theme */}
        <button className="p-2 rounded-full text-neutral-600 hover:text-[#e22d2c] hover:bg-[#e22d2c]/10 active:scale-95 transition-all duration-200 cursor-pointer">
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
