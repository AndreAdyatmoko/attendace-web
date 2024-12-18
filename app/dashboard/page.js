"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // Menandai apakah komponen sudah dimuat di klien

  useEffect(() => {
    setMounted(true); // Mengatur state mounted saat komponen dimuat di klien
  }, []);

  // Jangan setTheme selama SSR (Server-Side Rendering), hanya setelah mounted
  useEffect(() => {
    if (mounted) {
      setTheme("light");
    }
  }, [mounted, setTheme]);

  return <div>Dashboard Page</div>;
}

export default Dashboard;
