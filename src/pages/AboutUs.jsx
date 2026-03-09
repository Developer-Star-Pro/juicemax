import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Clock, Star, Users, Award, Heart } from "lucide-react";
import image from '../assets/Icon Logo.svg'
const AboutPage = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <Users size={20} />, value: "10,000+", label: "Happy Customers" },
    { icon: <Star size={20} />, value: "4.8", label: "Average Rating" },
    { icon: <Award size={20} />, value: "112+", label: "Menu Items" },
    { icon: <Heart size={20} />, value: "2", label: "Branches" },
  ];

  const branches = [
    {
      id: 1,
      area: "Bahria Enclave",
      address: "Sector A, Bahria Enclave, Islamabad",
      phones: ["0320-1579889", "0332-0005015"],
      mapUrl: "https://maps.google.com/?q=Bahria+Enclave+Islamabad",
    },
    {
      id: 2,
      area: "Jinnah Garden",
      address: "Jinnah Garden Phase I, Islamabad",
      phones: ["0335-0000566"],
      mapUrl: "https://maps.google.com/?q=Jinnah+Garden+Phase+1+Islamabad",
    },
  ];

  const highlights = [
    {
      icon: "🍊",
      title: "100% Natural",
      desc: "Fresh fruits, no artificial flavors or preservatives",
    },
    {
      icon: "🧊",
      title: "Made Fresh Daily",
      desc: "Every order made fresh — never pre-packed or stored",
    },
    {
      icon: "🚚",
      title: "Home Delivery",
      desc: "Fast delivery with minimum order of Rs 500",
    },
    {
      icon: "⭐",
      title: "Quality First",
      desc: "Over 112 menu items crafted with care and passion",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-10">
      {/* ── Hero ── */}
      <div className="text-center flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full  flex items-center justify-center text-4xl">
        <img src={image} alt="" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-neutral-900">
            Juice <span className="text-[#e22d2c]">Max</span>
          </h1>
          <p className="text-neutral-500 text-sm mt-1 max-w-sm mx-auto leading-relaxed">
            Islamabad's favorite destination for fresh juices, shakes, smoothies
            and so much more.
          </p>
        </div>
        <button
          onClick={() => navigate("/items")}
          className="bg-[#e22d2c] hover:bg-[#c11f1e] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-95 shadow-md"
        >
          Explore Our Menu
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-neutral-100 rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm text-center"
          >
            <div className="text-[#e22d2c]">{s.icon}</div>
            <p className="text-xl font-black text-neutral-900">{s.value}</p>
            <p className="text-xs text-neutral-500 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── Our Story ── */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h2 className="text-lg font-black text-neutral-900 mb-1">Our Story</h2>
        <div className="h-1 w-10 bg-[#e22d2c] rounded-full mb-4" />
        <div className="flex flex-col gap-3 text-sm text-neutral-600 leading-relaxed">
          <p>
            Juice Max was born from a simple belief — that everyone deserves a
            fresh, healthy, and delicious drink made from real ingredients. What
            started as a small juice stall in Islamabad has grown into a beloved
            brand with two thriving branches.
          </p>
          <p>
            We take pride in sourcing the freshest fruits daily and preparing
            every order from scratch. From our signature{" "}
            <span className="font-semibold text-[#e22d2c]">
              Juice Max Special
            </span>{" "}
            to exotic shakes, creamy lassis, and refreshing slushes — there's
            something for everyone on our menu.
          </p>
          <p>
            Our mission is simple:{" "}
            <span className="font-semibold text-neutral-800">
              make great taste accessible to all.
            </span>{" "}
            Whether you visit us in Bahria Enclave or Jinnah Garden, you'll
            always be welcomed with freshness and warmth.
          </p>
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div>
        <h2 className="text-lg font-black text-neutral-900 mb-1">
          Why Choose Us
        </h2>
        <div className="h-1 w-10 bg-[#e22d2c] rounded-full mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-white border border-neutral-100 rounded-2xl p-4 flex gap-4 items-start shadow-sm"
            >
              <div className="text-2xl">{h.icon}</div>
              <div>
                <p className="text-sm font-bold text-neutral-900">{h.title}</p>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Branches ── */}
      <div>
        <h2 className="text-lg font-black text-neutral-900 mb-1">
          Our Branches
        </h2>
        <div className="h-1 w-10 bg-[#e22d2c] rounded-full mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e22d2c]/10 flex items-center justify-center text-[#e22d2c]">
                  <MapPin size={16} />
                </div>
                <h3 className="font-black text-neutral-900 text-sm">
                  Branch {branch.id} — {branch.area}
                </h3>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed">
                {branch.address}
              </p>

              <div className="flex flex-col gap-1">
                {branch.phones.map((phone, i) => (
                  <a
                    key={i}
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-[#e22d2c] transition-colors"
                  >
                    <Phone size={13} className="text-[#64a955]" />
                    {phone}
                  </a>
                ))}
              </div>

              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-xl border border-[#e22d2c]/30 text-[#e22d2c] text-xs font-bold hover:bg-[#e22d2c]/5 transition-all"
              >
                <MapPin size={13} />
                View on Map
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Hours ── */}
      <div className="bg-white border border-neutral-100 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-[#e22d2c]" />
          <h2 className="text-lg font-black text-neutral-900">Opening Hours</h2>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { day: "Monday — Friday", hours: "11:00 AM — 12:00 AM" },
            { day: "Saturday", hours: "11:00 AM — 1:00 AM" },
            { day: "Sunday", hours: "12:00 PM — 1:00 AM" },
          ].map((h, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0"
            >
              <span className="text-sm text-neutral-600 font-medium">
                {h.day}
              </span>
              <span className="text-sm font-bold text-neutral-900">
                {h.hours}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#64a955] animate-pulse" />
          <p className="text-xs text-[#64a955] font-semibold">
            We are open now
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="bg-[#e22d2c] rounded-2xl p-6 text-center text-white">
        <p className="text-xl font-black mb-1">Ready to order?</p>
        <p className="text-sm text-white/80 mb-4">
          Fresh juices delivered to your door 🚚
        </p>
        <button
          onClick={() => navigate("/cart")}
          className="bg-white text-[#e22d2c] font-black px-6 py-2.5 rounded-xl text-sm hover:bg-neutral-100 transition-all active:scale-95"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
