import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib";

export const FooterTopSection = () => {
  return (
    <section className="container mx-auto max-w-7xl">
      <div className="flex items-center justify-center xl:mx-16">
        <div className="w-full md:mx-5 lg:mx-0 lg:w-[55.75rem] grid grid-cols-12 bg-muted-1 rounded-xl">
          <div className="col-span-6 xl:col-span-8 p-8 xl:px-11 flex flex-col justify-between">
            <div>
              <h2 className="text-lg md:text-2xl xl:text-3xl mb-3">
                Let’s Get creative!
              </h2>
              <p className="text-sm md:text-lg xl:text-xl">
                Start your creative Journey here
              </p>
            </div>

            <div>
              <Button variant={"primary"}>Get Started</Button>
            </div>
          </div>

          <div className="col-span-6 xl:col-span-4">
            <AspectRatio
              ratio={4 / 3}
              className={cn(
                "flex items-center justify-center xl:justify-end overflow-hidden"
              )}
            >
              <Image
                src={"/landing-page/monkey.svg"}
                alt={"monkey_icon"}
                width={286}
                height={229}
                className="rounded-xl xl:rounded-none"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterTopSection;
