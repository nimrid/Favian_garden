import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-16 border-t-2 border-muted-2">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between px-3 sm:px-5 lg:px-10 xl:px-0">
          {/* Brand Logo */}
          <Image src={"/logo.svg"} alt="logo" width={100} height={100} />

          <div className="flex items-center space-x-2 sm:space-x-5 lg:space-x-8 xl:space-x-10 border border-muted-foreground text-sm sm:text-base rounded-xl p-4 sm:px-8">
            <p>Stay Connected</p>

            <Link href={"#"}>
              <Image
                src={"/socials/facebook.svg"}
                alt="facebook_icon"
                width={20}
                height={20}
              />
            </Link>
            <Link href={"#"}>
              <Image
                src={"/socials/twitter.svg"}
                alt="facebook_icon"
                width={20}
                height={20}
              />
            </Link>
            <Link href={"#"}>
              <Image
                src={"/socials/linkedin.svg"}
                alt="facebook_icon"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row items-center justify-between py-6 border-t-2 border-muted-2 px-5 lg:px-10 xl:px-0">
          <div className="flex flex-wrap items-center gap-5 justify-center md:space-x-10">
            <div className="flex items-center space-x-1 xl:space-x-3">
              <Mail className="w-6 h-6 fill-accent-1 text-background-1" />
              <p>hello@faviangarden.com</p>
            </div>

            <div className="flex items-center space-x-1 xl:space-x-3">
              <Phone className="w-6 h-6 fill-accent-1 text-background-1" />
              <p>+91 91813 23 2309</p>
            </div>

            <div className="flex items-center space-x-1 xl:space-x-3">
              <MapPin className="w-6 h-6 fill-accent-1 text-background-1" />
              <p>Somewhere in the World</p>
            </div>
          </div>

          <p className="mt-6 xl:mt-0 text-muted-foreground">
            © 2024 Favian garden. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
