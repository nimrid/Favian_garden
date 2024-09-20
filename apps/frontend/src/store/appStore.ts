"use client";

import { MenuItem } from "@/types";
import { create } from "zustand";

type State = {
  selectedMenuItem?: MenuItem;
  showMobileMenu?: boolean;
};

type Action = {
  setSelectedMenuItem: (item: MenuItem) => void;
  setShowMobileMenu: (value: boolean) => void;
};

export const useAppStore = create<State & Action>((set) => ({
  selectedMenuItem: undefined,
  showMobileMenu: false,
  setSelectedMenuItem: (item: MenuItem) =>
    set(() => ({
      selectedMenuItem: item,
    })),
  setShowMobileMenu: (value: boolean) =>
    set(() => ({
      showMobileMenu: value,
    })),
}));

export const useApp = () => useAppStore((state) => state);
