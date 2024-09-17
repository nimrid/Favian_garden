import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";

export const FooterTopSection = () => {
  return (
    <section className="container mx-auto max-w-7xl flex items-center justify-center px-16">
      <div className="w-[55.75rem] grid grid-cols-12 bg-muted-1 rounded-xl">
        <div className="col-span-8 p-8 px-11 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl mb-3">Let’s Get creative!</h2>
            <p className="text-xl">Start your creative Journey here</p>
          </div>
          <div>
            <Button variant={"primary"}>Get Started</Button>
          </div>
        </div>

        <div className="col-span-4">
          <AspectRatio
            ratio={4 / 3}
            className="flex overflow-hidden items-center justify-end"
          >
            <Image
              src={"/landing-page/monkey.svg"}
              alt={"monkey_icon"}
              width={286}
              height={229}
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export default FooterTopSection;
