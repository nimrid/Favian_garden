import {
  FeatureSection,
  Footer,
  FooterTopSection,
  Header,
  HeroSection,
  RecentlyAddedNftsSection,
  TopNFTSection,
  TopSellerSection,
} from "@/components/landing-page";

import { ScrollArea } from "@/components/ui/scroll-area";
import { navItems } from "@/constant/constant";

const LandingPage = () => {
  return (
    <main>
      <ScrollArea className="w-screen h-screen">
        {/* Header | Navigation Bar Section */}
        <Header navItems={navItems} />

        {/* Hero Section */}
        <HeroSection />

        {/* Feature Section */}
        <FeatureSection />

        {/* Top NFT Section */}
        <TopNFTSection />

        {/* Top Seller */}
        <TopSellerSection />

        {/* Recently Added NFTs */}
        <RecentlyAddedNftsSection />

        {/* Footer Top */}
        <FooterTopSection />

        {/* Footer */}
        <Footer />
      </ScrollArea>
    </main>
  );
};

export default LandingPage;
