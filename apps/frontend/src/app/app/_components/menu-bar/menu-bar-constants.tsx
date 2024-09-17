import {
  ChartNoAxesCombined,
  CircleHelp,
  Folder,
  Settings,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { MenuGroup } from "@/types";
import { generateIcon } from "./menu-icons";

export const menuItems: MenuGroup[] = [
  {
    uniqueId: uuidv4(),
    items: [
      {
        uniqueId: uuidv4(),
        name: "Generate",
        route: "/app/",
        icon: (className) =>
          generateIcon({
            className,
          }),
      },
      {
        uniqueId: uuidv4(),
        name: "My Creations",
        route: "/app/my-creations",
        icon: (className) => <Folder className={className} />,
      },
      {
        uniqueId: uuidv4(),
        name: "Market",
        route: "/app/market",
        icon: (className) => <ChartNoAxesCombined className={className} />,
      },
    ],
  },
  {
    uniqueId: uuidv4(),
    items: [
      {
        uniqueId: uuidv4(),
        name: "Settings",
        route: "/app/settings",
        icon: (className) => <Settings className={className} />,
      },
      {
        uniqueId: uuidv4(),
        name: "Help",
        route: "/app/help",
        icon: (className) => <CircleHelp className={className} />,
      },
    ],
  },
];
