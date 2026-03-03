export const theme = {
  colors: {
    background: {
      base: "#0B0F14",
      ambient: "#141A22",
      lifted: "#111827",
    },

    glass: {
      base: "rgba(255, 255, 255, 0.07)",
      border: "rgba(255, 255, 255, 0.16)",
      muted: "rgba(255, 255, 255, 0.04)",
    },

    primary: {
      main: "#3b82f6",
      light: "#60a5fa",
      dark: "#2563eb",
    },

    status: {
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
    },

    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.72)",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
  },

  backgrounds: {
    default: `radial-gradient(1200px 600px at 10% -10%, rgba(255,255,255,0.08), transparent 40%), linear-gradient(180deg, #0B0F14, #141A22)`,
    raised: `linear-gradient(180deg, #111827, #0B0F14)`,
    deep: `radial-gradient(1000px 500px at 50% -20%, rgba(255,255,255,0.10), #0B0F14 60%)`,
  },

  gradients: {
    primary: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
  },

  liquidGlass: {
    background: "rgba(255, 255, 255, 0.07)",
    backdropFilter: "blur(40px) saturate(180%)",
    WebkitBackdropFilter: "blur(40px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },

  liquidGlassHover: {
    background: "rgba(255, 255, 255, 0.09)",
    backdropFilter: "blur(50px) saturate(200%)",
    WebkitBackdropFilter: "blur(50px) saturate(200%)",
    boxShadow: "0 12px 40px rgba(255, 255, 255, 0.1)",
  },
};
