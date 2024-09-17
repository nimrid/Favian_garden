import MarketPlaceCard from "@/app/app/_components/marketplace-page/marketplace-card";
import { marketPlaceNFTs } from "@/constant";
import { cn } from "@/lib";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export const RecentlyAddedNftsSection = () => {
  return (
    <section className="container mx-auto max-w-7xl mb-32">
      <h3 className="text-3xl font-[600]">Recently added</h3>
      <div className="w-full flex items-center gap-10">
        <div className="grid grid-cols-12 gap-16 mt-8 w-fit">
          {marketPlaceNFTs
            ?.slice(0, 4)
            ?.map((c) => (
              <MarketPlaceCard
                className={cn("col-span-3")}
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
        </div>
        <div className="w-fit flex items-center justify-end">
          <Button
            variant={"secondary"}
            size={"icon"}
            className="bg-accent-1/50 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentlyAddedNftsSection;
