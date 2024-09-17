import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { MyCreationCard } from "../_components/my-creations/my-creation-card";

const MyCreationsPage: React.FC = () => {
  return (
    <main className="container mx-auto max-w-7xl p-10">
      <div className="flex items-center space-x-12">
        <Button
          size={"lg"}
          className={cn("bg-accent-1/80 hover:bg-accent-1/60 min-w-36")}
        >
          In market
        </Button>
        <Button
          variant={"outline"}
          size={"lg"}
          className={cn(
            "border-accent-1/50 hover:border-accent-1/60 hover:bg-background-1/20 min-w-36"
          )}
        >
          Draft
        </Button>
      </div>

      <div className="mt-10 grid grid-cols-12 w-full gap-6">
        {new Array(3).fill(0).map((_, idx) => (
          <div className="col-span-4" key={idx}>
            <MyCreationCard
              imageUrl="/images/dialog-nft.png"
              label="Jade #304"
              price="47.25 SOL"
              nftType="Art"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyCreationsPage;
