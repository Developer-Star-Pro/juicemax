import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const themeClasses = {
    // Background classes (Light Mode Only)
    bg: {
      // whole page background - clean white
      primary: "bg-white",

      // slightly elevated surfaces - light grey
      secondary: "bg-neutral-50/80 backdrop-blur-md",

      // NEW primary accent color from "Juice" logo
      accent: "bg-[#e22d2c]",

      // Secondary logo color accent
      accentGreen: "bg-[#64a955]",

      // navbar - glassmorphism on white
      nav: "bg-white/90 backdrop-blur-xl border-b border-neutral-100",

      // CARD style (glass / frosted on light)
      card: "bg-white/80 backdrop-blur-xl border border-neutral-100 shadow-lg",
    },

    // Text classes
    text: {
      primary: "text-neutral-900", // near black for readability
      secondary: "text-neutral-600", // dark grey
      accent: "text-[#e22d2c]", // logo red
      muted: "text-neutral-500", // medium grey
      accentGreen: "text-[#64a955]",
    },

    // Borders
    border: {
      primary: "border-neutral-200", // subtle light grey lines
      secondary: "border-neutral-100",
      accent: "border-[#e22d2c]", // logo red
    },

    // Buttons
    button: {
      // Bold red primary button
      primary:
        "bg-[#e22d2c] hover:bg-[#c11f1e] text-white font-semibold shadow-sm",

      // subtle grey secondary button
      secondary:
        "bg-neutral-100 border border-neutral-200 text-neutral-800 hover:bg-neutral-200",

      // outline using logo green for contrast
      outline: "border border-[#64a955] text-[#64a955] hover:bg-[#64a955]/10",
    },

    // Inputs
    input:
      "bg-white border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:border-[#e22d2c] focus:ring-[#e22d2c]/40",
  };
  const textSizes = {
    p: "text-xs sm:text-base",
    h: "text-[1.1rem] sm:text-2xl md:text-3xl lg:text-4xl",
  };

  const value = {
    themeClasses,
    textSizes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
