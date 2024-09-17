import { topSellers } from "@/constant";
import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";

export const TopSellerSection = () => {
  return (
    <section className="container mx-auto max-w-7xl mb-32">
      <h3 className="text-3xl font-[600]">Our Top sellers</h3>
      <div className="w-full flex items-center gap-10">
        <div className="grid grid-cols-5 w-[97%] gap-16 mt-8">
          {topSellers?.map((s) => (
            <div key={s.handle}>
              <AspectRatio ratio={4 / 5}>
                <Image src={s.avatar} alt={s.handle} width={201} height={167} />
                <h4 className="my-3 text-xl text-center">{s.name}</h4>
                <p className="text-center">
                  {s.currencySymbol}
                  {s.earning}
                </p>
              </AspectRatio>
            </div>
          ))}
        </div>

        <div className="w-fit flex items-center justify-end">
          <Button
            variant={"secondary"}
            size={"icon"}
            className="bg-accent-1/50 rounded-full"
            asChild
          >
            <Link href={"/app/market"}>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopSellerSection;
