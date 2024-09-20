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
      <h3 className="text-3xl font-[600] px-5 lg:px-10 xl:px-0">
        Our Top sellers
      </h3>

      <div className="w-full flex flex-col xl:flex-row items-center gap-10 px-5 lg:px-10 xl:px-0">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-4 xl:grid-cols-5 w-full h-fit xl:w-[97%] xl:gap-16 mt-8">
          {topSellers?.map((s) => (
            <div key={s.handle}>
              <AspectRatio
                ratio={4 / 5}
                className="flex items-center justify-center"
              >
                <div>
                  <Image
                    src={s.avatar}
                    alt={s.handle}
                    width={201}
                    height={167}
                  />
                  <h4 className="my-3 text-xl text-center">{s.name}</h4>
                  <p className="text-center">
                    {s.currencySymbol}
                    {s.earning}
                  </p>
                </div>
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
