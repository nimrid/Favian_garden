import MarketPlaceCard from "@/app/app/_components/marketplace-page/marketplace-card";
import { marketPlaceNFTs } from "@/constant";
import { cn } from "@/lib";
import React from "react";

export const TopNFTSection = () => {
  // TODO: API Call

  return (
    <section className="container mx-auto max-w-7xl mb-32">
      <h3 className="text-3xl font-[600] px-5 lg:px-10 xl:px-0">
        Today’s top NFT
      </h3>
      <div className="grid grid-cols-12 gap-12 mt-8 px-5 lg:px-10 xl:px-0">
        {marketPlaceNFTs
          ?.slice(0, 8)
          ?.map((c) => (
            <MarketPlaceCard
              className={cn("col-span-6 md:col-span-4 xl:col-span-3")}
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
    </section>
  );
};

export default TopNFTSection;
