"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Plus, X } from "lucide-react";
import * as React from "react";
import SearchBox from "../_components/search-box";
import { cn } from "@/lib";
import MarketPlaceCard from "../_components/marketplace-page/marketplace-card";
import { ScrollArea } from "@/components/ui/scroll-area";

const filterOptionsData = [
  {
    label: "All",
    visible: true,
  },
  {
    label: "Utility",
    visible: true,
  },
  {
    label: "Art",
    visible: true,
  },
  {
    label: "Game",
    visible: false,
  },
  {
    label: "Music",
    visible: false,
  },
];

const cards = [
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

type FilterOptions = (typeof filterOptionsData)[number]["label"];

const MarketPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState<FilterOptions>("All");
  const [visibleAllFilters, setVisibleAllFilters] = React.useState(false);

  const [search, setSearch] = React.useState("");
  const [filterOptions, setFilterOptions] = React.useState([
    ...filterOptionsData,
  ]);

  const handleShowAllButtons = async () => {
    if (visibleAllFilters) {
      // Then Close
      setVisibleAllFilters(false);
      setFilterOptions([...filterOptionsData]);
    } else {
      // Open
      setVisibleAllFilters(true);
      setFilterOptions((prev) =>
        prev?.map((option) => {
          const newOption = {
            ...option,
          };
          newOption.visible = true;
          return newOption;
        })
      );
    }
  };

  return (
    <ScrollArea className="container mx-auto max-w-7xl w-full h-screen">
      <main className="p-12">
        {/* Search + Add Wishlist Section */}
        <section className="flex items-center justify-between">
          <SearchBox
            value={search}
            onChange={(value) => {
              setSearch(value);
            }}
          />
          <div className="flex items-center justify-center flex-col space-y-1">
            <Button variant={"ghost"} size={"icon"} className="bg-accent-muted">
              <Plus className="w-5 h-5" />
            </Button>
            <p className="text-xs">Add Wallet</p>
          </div>
        </section>

        {/* Filter Section */}
        <section className="flex items-center space-x-2 mt-6">
          <Button variant={"ghost"} size={"icon"} className="h-10 w-10">
            <Filter className="w-4 h-4" />
          </Button>

          {/* Filter Buttons */}
          {filterOptions
            ?.filter((f) => f.visible)
            ?.map((f) => (
              <Button
                key={f.label}
                variant={activeFilter === f.label ? "primary" : "tertiary"}
                className={cn(
                  "w-28 h-10",
                  activeFilter === f.label
                    ? "bg-accent-1/50 text-white hover:bg-accent-1/30"
                    : ""
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  setActiveFilter(f.label);
                }}
              >
                {f.label}
              </Button>
            ))}

          {/* Show All Buttons */}
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn("h-10 w-10")}
            onClick={handleShowAllButtons}
          >
            {visibleAllFilters ? (
              <X className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </section>

        {/* Cards Section */}
        <section className="grid grid-cols-12 gap-5 mt-8">
          {cards?.map((c) => (
            <MarketPlaceCard
              className={cn("col-span-4")}
              key={c.id}
              id={c.id}
              label={c.label}
              tag={c.tag}
              price={c.price}
              totalLikes={c.totalLikes}
              liked={c.liked}
              imageUrl={c.image}
              createdBy={c.createdBy}
            />
          ))}
        </section>
      </main>
    </ScrollArea>
  );
};

export default MarketPage;
