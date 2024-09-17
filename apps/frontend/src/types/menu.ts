export type MenuGroup = {
  uniqueId: string;
  name?: string;
  items: MenuItem[];
};

export type MenuItem = {
  uniqueId: string;
  name: string;
  route: string;
  icon?: (className?: string) => React.ReactNode;
  prefix?: React.ReactNode;
  postfix?: React.ReactNode;
};

export enum Routes {
  Generate = "/app/",
  MyCreations = "/app/my-creations",
  Market = "/app/market",
  Settings = "/app/settings",
  Help = "/app/help",
}
