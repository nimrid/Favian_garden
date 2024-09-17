import { Feature, NavItem } from "@/types";

/**
 * Dummy Data
 * For Marker place
 */
export const marketPlaceNFTs = [
  {
    id: 1,
    label: "Dragonfly #501",
    tag: "Art",
    price: "47.25 SOL",
    totalLikes: 432,
    liked: false,
    createdBy: "@sadeomoni",
    image: "/images/marketplace/1.png",
  },
  {
    id: 2,
    label: "Galactic War #245",
    tag: "Game",
    price: "22.43 SOL",
    totalLikes: 179,
    liked: true,
    createdBy: "@charlesuks",
    image: "/images/marketplace/2.png",
  },
  {
    id: 3,
    label: "Solara #345",
    tag: "Art",
    price: "35.77 SOL",
    totalLikes: 295,
    liked: false,
    createdBy: "@damdam",
    image: "/images/marketplace/3.png",
  },
  {
    id: 4,
    label: "Chess Master #109",
    tag: "Game",
    price: "50.30 SOL",
    totalLikes: 512,
    liked: true,
    createdBy: "@yusuffsheriff",
    image: "/images/marketplace/4.png",
  },
  {
    id: 5,
    label: "Jade #89",
    tag: "Art",
    price: "19.55 SOL",
    totalLikes: 98,
    liked: true,
    createdBy: "@constant",
    image: "/images/marketplace/5.png",
  },
  {
    id: 6,
    label: "Phoenix #27",
    tag: "Art",
    price: "45.20 SOL",
    totalLikes: 276,
    liked: false,
    createdBy: "@charlesuks",
    image: "/images/marketplace/6.png",
  },
  {
    id: 7,
    label: "Nebula #704",
    tag: "Game",
    price: "33.12 SOL",
    totalLikes: 341,
    liked: false,
    createdBy: "@johnnyart",
    image: "/images/marketplace/7.png",
  },
  {
    id: 8,
    label: "Eclipse #102",
    tag: "Art",
    price: "27.88 SOL",
    totalLikes: 217,
    liked: true,
    createdBy: "@sadeomoni",
    image: "/images/marketplace/8.png",
  },
  {
    id: 9,
    label: "Crimson Claw #190",
    tag: "Art",
    price: "41.75 SOL",
    totalLikes: 523,
    liked: true,
    createdBy: "@constant",
    image: "/images/marketplace/9.png",
  },
  {
    id: 10,
    label: "Aurora Song #93",
    tag: "Music",
    price: "36.50 SOL",
    totalLikes: 308,
    liked: false,
    createdBy: "@damdam",
    image: "/images/marketplace/7.png",
  },
  {
    id: 11,
    label: "Cosmic Dance #12",
    tag: "Art",
    price: "16.33 SOL",
    totalLikes: 184,
    liked: true,
    createdBy: "@yusuffsheriff",
    image: "/images/marketplace/8.png",
  },
  {
    id: 12,
    label: "Solar Flare #56",
    tag: "Art",
    price: "39.99 SOL",
    totalLikes: 432,
    liked: false,
    createdBy: "@charlesuks",
    image: "/images/marketplace/9.png",
  },
];

/**
 * Dummy Sellers
 * For Market place
 */

type Seller = {
  avatar: string;
  name: string;
  handle: string;
  earning: string;
  currencySymbol: string;
};

export const topSellers: Seller[] = [
  {
    avatar: "/images/sellers/1.png",
    name: "Jane Janet",
    handle: "@janeJanet",
    earning: "123187",
    currencySymbol: "$",
  },
  {
    avatar: "/images/sellers/2.png",
    name: "Ron Prince",
    handle: "@RonPrince",
    earning: "231213",
    currencySymbol: "$",
  },
  {
    avatar: "/images/sellers/3.png",
    name: "Olivia Riley",
    handle: "@OliviaRiley",
    earning: "2392318",
    currencySymbol: "$",
  },
  {
    avatar: "/images/sellers/4.png",
    name: "Emma Grace",
    handle: "@EmmaGrace",
    earning: "372381",
    currencySymbol: "$",
  },
  {
    avatar: "/images/sellers/5.png",
    name: "Aisha",
    handle: "@Aisha",
    earning: "231144",
    currencySymbol: "$",
  },
];

export const navItems: NavItem[] = [
  {
    label: "Generate",
    href: "/app/",
  },
  {
    label: "Market Place",
    href: "/app/market",
  },
  {
    label: "About",
    href: "/app/help",
  },
];

export const features: Feature[] = [
  {
    id: 1,
    icon: "/landing-page/features/1.svg",
    label: "Set up wallet",
    description:
      "Connect your wallet by clicking on the plus Icon on the upper right screen and setting up any wallet of choice",
  },
  {
    id: 2,
    icon: "/landing-page/features/2.svg",
    label: "Create your NFT",
    description:
      "Get creative! generate any design in any canvas of your choice,",
  },
  {
    id: 3,
    icon: "/landing-page/features/3.svg",
    label: "Mint your NFT",
    description: "Add name, descriptions and price tag to your NFT",
  },
  {
    id: 4,
    icon: "/landing-page/features/4.svg",
    label: "List NFTs for sale",
    description: "Upload your new NFTs for sale at the market place",
  },
];
