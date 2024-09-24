"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, Plus, X } from "lucide-react";
import * as React from "react";
import SearchBox from "../_components/search-box";
import { cn } from "@/lib";
import MarketPlaceCard from "../_components/marketplace-page/marketplace-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { marketPlaceNFTs } from "@/constant";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

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
          <WalletMultiButton/>
          {/* <div className="flex items-center justify-center flex-col space-y-1">
            <Button variant={"ghost"} size={"icon"} className="bg-accent-muted">
              <Plus className="w-5 h-5" />
            </Button>
            <p className="text-xs">Add Wallet</p>
          </div> */}
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
          {/* TODO: API Implementation */}
          {marketPlaceNFTs?.map((c) => (
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
