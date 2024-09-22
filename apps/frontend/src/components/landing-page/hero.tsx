import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { cn } from "@/lib";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export const HeroSection = () => {
  return (
    <section className="container mx-auto max-w-7xl">
      {/* First Line */}
      <div className="flex sm:grid sm:grid-cols-12 sm:gap-10 mt-6 mx-1 md:mx-10 xl:mx-0">
        {/* Left */}
        <div
          className={cn(
            "col-span-full w-full px-5 text-center md:px-0 md:col-span-6 h-full flex items-center flex-col justify-center md:text-start"
          )}
        >
          <div>
            <h1 className="text-3xl lg:text-4xl xl:text-6xl font-semibold text-wrap whitespace-normal max-w-xl">
              Your
              <span className="gradient-text mx-2 ml-3">NFT,</span>
              your way, no artist needed
            </h1>
            <p className="my-5 xl:my-8 text-xl lg:text-2xl">
              Unlock the future of digital art with AI generated NFTs
            </p>
            <div className="mt-12 md:mt-8 xl:mt-3 flex items-center justify-center md:justify-start space-x-8">
              <Button variant={"primary"} size={"sm"}>
                Get Started
              </Button>
              <WalletMultiButton></WalletMultiButton>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className={cn("col-span-full mt-8 md:mt-0 md:col-span-6")}>
          <AspectRatio
            ratio={3 / 2}
            className="flex items-center justify-center p-5 lg:p-1 xl:p-16"
          >
            <Image
              src="/landing-page/hero1.svg"
              alt="Hero Image 1"
              width={600}
              height={588}
            />
          </AspectRatio>
        </div>
      </div>

      {/* Second Line */}
      <div
        className={cn(
          "flex flex-col sm:grid sm:grid-cols-12 gap-10 mt-32 mx-1 xl:mx-0 md:mx-10"
        )}
      >
        <div className="col-span-full md:col-span-6 xl:col-span-5">
          <AspectRatio
            ratio={5 / 4}
            className="p-8 md:p-1 xl:p-8 flex items-center justify-center"
          >
            <Image
              src={"/landing-page/hero2.svg"}
              alt="Hero Image 2"
              width={425}
              height={500}
            />
          </AspectRatio>
        </div>

        <div className="col-span-full mt-12 md:mt-0 md:col-span-6 xl:col-span-7 text-center">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full xl:w-[50%]">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-semibold">
                Imaginations that <span className="gradient-text">leads</span>
              </h2>
              <p className="my-5 mb-8 xl:my-8 text-base lg:text-2xl xl:text-xl">
                Let your Imaginations guide you and bring out the creativity in
                you{" "}
              </p>

              <Button variant={"primary"} size={"sm"}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
