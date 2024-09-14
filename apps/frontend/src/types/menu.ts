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
