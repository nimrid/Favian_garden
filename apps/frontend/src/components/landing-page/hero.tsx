import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

export const HeroSection = () => {
  return (
    <section className="container mx-auto max-w-7xl">
      {/* First Line */}
      <div className="grid grid-cols-12 gap-10 mt-6">
        {/* Left */}
        <div className="col-span-6 h-full flex items-center flex-col justify-center text-start">
          <div>
            <h1 className="text-7xl font-semibold text-wrap whitespace-normal max-w-xl">
              Your
              <span className="gradient-text mx-2">NFT,</span>
              your way, no artist needed
            </h1>
            <p className="my-8 text-3xl">
              Unlock the future of digital art with AI generated NFTs
            </p>
            <div className="flex items-center space-x-8">
              <Button variant={"primary"} size={"sm"}>
                Get Started
              </Button>
              <Button variant={"outline"} size={"sm"}>
                Connect wallet
              </Button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="col-span-6">
          <AspectRatio
            ratio={3 / 2}
            className="flex items-center justify-center p-16"
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
      <div className="grid grid-cols-12 gap-10 mt-32">
        <div className="col-span-5">
          <AspectRatio
            ratio={5 / 4}
            className="p-8 flex items-center justify-center"
          >
            <Image
              src={"/landing-page/hero2.svg"}
              alt="Hero Image 2"
              width={425}
              height={500}
            />
          </AspectRatio>
        </div>

        <div className="col-span-7">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[50%]">
              <h2 className="text-5xl font-semibold">
                Imaginations that <span className="gradient-text">leads</span>
              </h2>
              <p className="my-8 text-xl">
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
