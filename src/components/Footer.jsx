import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo1 from "../assets/Icon Logo.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const { themeClasses } = useTheme();
  const { categories } = useSelector((s) => s.home);

  const links = {
    Company: [
      { label: "About Us", path: "/about" },
      { label: "Our Story", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
    "Our Menu": categories.slice(0, 4).map((c) => ({
      label: c.name,
      path: `/items?category=${encodeURIComponent(c.name)}`,
    })),
  };

  const socials = [
    { icon: <Facebook size={18} />, href: "#" },
    { icon: <Instagram size={18} />, href: "#" },
    { icon: <Twitter size={18} />, href: "#" },
    { icon: <Youtube size={18} />, href: "#" },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img className="w-10" src={logo1} alt="" />
            <span className="text-xl text-[#e22d2c] font-black tracking-wide">
              JUICE{" "}
              <span className={`${themeClasses.text.accentGreen}`}>MAX</span>
            </span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Pure, fresh, and naturally delicious juices made from handpicked
            fruits. Taste the difference.
          </p>

          {/* Socials */}
          <div className="flex gap-2 mt-1">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-[#e22d2c] hover:text-[#e22d2c] hover:bg-[#e22d2c]/10 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="hidden sm:flex flex-col gap-3">
            <h4 className="text-sm font-black uppercase tracking-widest text-neutral-300">
              {title}
            </h4>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-neutral-500 text-sm hover:text-[#e22d2c] transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Bar */}
    <div className="border-t border-neutral-800 max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm text-neutral-500">
  <span className="flex items-center gap-2 hover:text-[#e22d2c] transition-colors cursor-pointer">
    <MapPin size={15} /> Sector A, Bahria Enclave, Islamabad
  </span>
  <a href="tel:03201579889" className="flex items-center gap-2 hover:text-[#e22d2c] transition-colors">
    <Phone size={15} /> 0320-1579889
  </a>
  <a href="tel:03350000566" className="flex items-center gap-2 hover:text-[#e22d2c] transition-colors">
    <Phone size={15} /> 0335-0000566
  </a>
</div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-600 max-w-6xl mx-auto">
        <p>© 2025 Juice Max. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to={'/about'} className="hover:text-[#e22d2c] transition-colors">
           About Us
          </Link>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
