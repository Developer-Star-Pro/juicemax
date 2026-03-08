import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import logo1 from "../assets/Icon Logo.svg";


const Footer = () => {
    const {themeClasses}=useTheme()
  const links = {
    Company: ["About Us", "Our Story", "Careers", "Blog"],
    Products: ["Fresh Juices", "Smoothies", "Detox Drinks", "Seasonal Specials"],
    Support: ["FAQ", "Shipping Info", "Return Policy", "Track Order"],
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
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img  className = "w-10" src={logo1} alt="" />
            <span className="text-xl text-[#e22d2c] font-black tracking-wide">JUICE <span className={`${themeClasses.text.accentGreen}`} >MAX</span></span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Pure, fresh, and naturally delicious juices made from handpicked fruits. Taste the difference.
          </p>

          {/* Socials */}
          <div className="flex gap-2 mt-1">
            {socials.map((s, i) => (
              <a key={i} href={s.href}
                className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 hover:border-[#e22d2c] hover:text-[#e22d2c] hover:bg-[#e22d2c]/10 transition-all duration-200">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link Columns */}
        {Object.entries(links).map(([title, items]) => (
          <div key={title} className="hidden sm:flex flex-col gap-3">
            <h4 className="text-sm font-black uppercase tracking-widest text-neutral-300">
              {title}
            </h4>
            <ul className="flex flex-col gap-2">
              {items.map((item) => (
                <li key={item}>
                  <a href="#"
                    className="text-neutral-500 text-sm hover:text-[#e22d2c] transition-colors duration-200 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Bar */}
      <div className="border-t border-neutral-800 max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm text-neutral-500">
        <span className="flex items-center gap-2 hover:text-[#e22d2c] transition-colors cursor-pointer">
          <MapPin size={15} /> 123 Fruit Street, Fresh City
        </span>
        <span className="flex items-center gap-2 hover:text-[#e22d2c] transition-colors cursor-pointer">
          <Phone size={15} /> +1 234 567 890
        </span>
        <span className="flex items-center gap-2 hover:text-[#e22d2c] transition-colors cursor-pointer">
          <Mail size={15} /> hello@juicemax.com
        </span>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-600 max-w-6xl mx-auto">
        <p>© 2025 Juice Max. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#e22d2c] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#e22d2c] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#e22d2c] transition-colors">Cookies</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;