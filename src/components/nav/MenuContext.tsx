"use client";

import { createContext, useContext, useState, useCallback } from "react";

type MenuCtx = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const Ctx = createContext<MenuCtx | null>(null);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  const close = useCallback(() => setOpen(false), []);
  return <Ctx.Provider value={{ open, toggle, close }}>{children}</Ctx.Provider>;
}

export function useMenu() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
}
