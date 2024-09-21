import MarketPlaceCard from "@/app/app/_components/marketplace-page/marketplace-card";
import { marketPlaceNFTs } from "@/constant";

export const TopNFTSection = () => {
  // TODO: API Call

  return (
    <section className="container mx-auto max-w-7xl mb-16 sm:mb-32">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-[600] px-5 lg:px-10 xl:px-0">
        Today’s top NFT
      </h3>

      <div className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-12 mt-5 sm:mt-8 px-5 lg:px-10 xl:px-0">
        {marketPlaceNFTs
          ?.slice(0, 8)
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
    </section>
  );
};

export default TopNFTSection;
