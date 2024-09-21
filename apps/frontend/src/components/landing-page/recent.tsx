import { ChevronRight } from "lucide-react";

import MarketPlaceCard from "@/app/app/_components/marketplace-page/marketplace-card";
import { marketPlaceNFTs } from "@/constant";
import { Button } from "../ui/button";

export const RecentlyAddedNftsSection = () => {
  return (
    <section className="container mx-auto max-w-7xl mb-16 xl:mb-32">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-[600] px-5 lg:px-10 xl:px-0">
        Recently added
      </h3>

      <div className="w-full flex flex-col xl:flex-row items-center gap-10 px-5 lg:px-10 xl:px-0">
        <div className="grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-16 sm:mt-8 mt-5 w-full xs:w-fit">
          {marketPlaceNFTs
            ?.slice(0, 4)
            ?.map((c) => (
              <MarketPlaceCard
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
