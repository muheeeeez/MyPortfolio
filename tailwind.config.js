/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // macOS-inspired colors
        primary: "#007AFF",
        secondary: "#5856D6",
        accent: "#34C759",
        success: "#34C759",
        warning: "#FF9500",
        danger: "#FF3B30",

        // Legacy colors (for old views - not used in macOS design)
        "card-bg": "#FDF0F5",
        dark: "#f2f2f2",
        light: "#212121",

        // macOS light mode
        "macos-bg": "#F5F5F7",
        "macos-sidebar": "#E8E8ED",
        "macos-window": "#FFFFFF",
        "macos-border": "#D1D1D6",
        "macos-text": "#1D1D1F",
        "macos-text-secondary": "#86868B",

        // macOS dark mode
        "macos-dark-bg": "#1E1E1E",
        "macos-dark-sidebar": "#252526",
        "macos-dark-window": "#2D2D30",
        "macos-dark-border": "#3E3E42",
        "macos-dark-text": "#CCCCCC",
        "macos-dark-text-secondary": "#858585",

        // VS Code colors
        "vscode-bg": "#1E1E1E",
        "vscode-sidebar": "#252526",
        "vscode-editor": "#1E1E1E",
        "vscode-border": "#3E3E42",
        "vscode-blue": "#569CD6",
        "vscode-green": "#4EC9B0",
        "vscode-yellow": "#DCDCAA",
        "vscode-orange": "#CE9178",
        "vscode-purple": "#C586C0",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "sf-pro": [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["SF Mono", "Monaco", "Consolas", "monospace"],
      },
      backdropBlur: {
        macos: "40px",
      },
      scale: {
        102: "1.02",
      },
      animation: {
        "dock-bounce": "dock-bounce 0.5s ease-in-out",
        "window-appear": "window-appear 0.3s ease-out",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slide-up 0.3s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "dock-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "window-appear": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        "macos-window": "0 20px 60px rgba(0, 0, 0, 0.3)",
        "macos-dock": "0 5px 30px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
