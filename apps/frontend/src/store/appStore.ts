"use client";

import { MenuItem } from "@/types";
import { create } from "zustand";

type State = {
  selectedMenuItem?: MenuItem;
};

type Action = {
  setSelectedMenuItem: (item: MenuItem) => void;
};

export const useAppStore = create<State & Action>((set) => ({
  selectedMenuItem: undefined,
  setSelectedMenuItem: (item: MenuItem) =>
    set(() => ({
      selectedMenuItem: item,
    })),
}));

export const useApp = () => useAppStore((state) => state);
