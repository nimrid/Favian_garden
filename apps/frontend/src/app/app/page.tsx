"use client";

import { Download, Plus, RotateCw, WandSparkles } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib";
import {
  bulbLightningIcon,
  landscapeIcon,
  mintIcon,
  portraitIcon,
  squareIcon,
} from "./_components/generate-page";
import ImageContainer from "./_components/image-container";
import { PageTitle } from "./_components/page-title";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import MintForm from "./_components/generate-page/mint-form";
const buttonLabels = [
  "Anime",
  "3D art",
  "Dream",
  "Pencil Sketch",
  "Grafitti",
  "Pixel art",
  "Illustration",
  "Pop art",
  "Collages",
];

export default function HomePage() {
  const [text, setText] = React.useState("");
  const [mintBtnClicked, setMintBtnClicked] = React.useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <ScrollArea className="container max-w-7xl mx-auto w-full h-screen">
      <main className="p-6 xl:p-12 mb-16 lg:mb-0">
        {/* Top Section */}
        <section className="flex w-full items-center justify-between lg:justify-end">
          <div className="bg-slate-700 p-1 rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"ghost"}
                size={"icon"}
                className="bg-accent-muted"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add Wallet</TooltipContent>
          </Tooltip>
        </section>

        {/* Generate Section */}
        <section className="flex flex-col space-y-2 mt-6 lg:mt-0">
          <PageTitle label="Hi Soumitra" as="h1" />
          <div className="relative group">
            <Textarea
              className="textarea-gradient bg-transparent text-white placeholder-gray-400 p-4 w-full h-40 rounded-lg border border-green-500/40 shadow-lg text-sm focus:ring-2 focus:ring-green-500 lg:text-lg text-white/80 placeholder:text-sm lg:placeholder:text-base"
              placeholder="Enter your Prompt..."
              maxLength={200}
              value={text} // Bind the value to the textarea
              onChange={handleTextChange} // Update state on text change
            />
            <div className="flex items-center justify-between mt-1">
              <Button variant={"ghost"} size={"icon"}>
                <RotateCw className="h-4 w-4 lg:w-6 lg:h-6 text-green-500" />
              </Button>
              <p className="text-end mt-1 text-sm text-muted-foreground">
                {text.length}/200
              </p>
            </div>

            {/* Inspire me button */}
            {text.length <= 100 && (
              <Button
                variant={"outline"}
                className="absolute left-3 bottom-14 rounded-xl border-green-500 transition-opacity duration-200 opacity-100"
              >
                <div className="flex space-x-2 items-center">
                  {bulbLightningIcon()}
                  <span className="hidden lg:block">Inspire me</span>
                </div>
              </Button>
            )}
          </div>
        </section>

        {/* Type of NFTs */}
        <section className="flex flex-col space-y-6 mt-6 h-auto">
          <PageTitle
            label="Choose types of NFTS"
            as="h2"
            className="text-center lg:text-start"
          />
          <div className="flex flex-wrap gap-3 items-center justify-evenly lg:justify-between">
            <ImageContainer
              url={"/images/metaverse_land.png"}
              label="Metaverse land"
            />
            <ImageContainer url={"/images/utility.png"} label="Utility" />
            <ImageContainer url={"/images/game.png"} label="Game" />
            <ImageContainer url={"/images/art.png"} label="Art" />
            <ImageContainer url={"/images/music.png"} label="Music" />
          </div>
        </section>

        {/* Style Design */}
        <section className="flex flex-col space-y-6 mt-6">
          <PageTitle
            label="Choose style design"
            as="h2"
            className="text-center lg:text-start"
          />
          <div className="flex flex-wrap gap-5 items-center justify-evenly">
            {buttonLabels.map((label) => (
              <Button
                key={label}
                variant={"outline"}
                size={"lg"}
                className={cn("rounded-xl border-green-500/50 min-w-36")}
              >
                {label}
              </Button>
            ))}
          </div>
        </section>

        {/* Canvas */}
        <section className="flex flex-col space-y-6 mt-6">
          <PageTitle
            label="Choose canvas"
            as="h2"
            className="text-center lg:text-start"
          />
          <div className="flex flex-col lg:flex-row justify-between w-full h-fit items-baseline">
            <div className="flex flex-wrap w-full gap-5 items-center justify-evenly lg:justify-start lg:items-end">
              <Button
                className={cn("bg-muted-2 w-[4rem] h-[4rem]")}
                variant={"ghost"}
                size={"icon"}
              >
                <div className="flex w-full h-full items-center justify-center flex-col">
                  <Plus className="w-5 h-5" />
                  <span className="text-[9px]">Add Yours</span>
                </div>
              </Button>
              <Button
                className={cn("bg-muted-2 w-[4rem] h-[4rem]")}
                variant={"ghost"}
                size={"icon"}
              >
                <div className="flex items-center w-full h-full justify-center flex-col">
                  {squareIcon("w-4 h-4")}
                  <span className="text-[9px]">Square</span>
                </div>
              </Button>
              <Button
                className={cn("bg-muted-2 w-[4rem] h-[5rem]")}
                variant={"ghost"}
                size={"icon"}
              >
                <div className="flex items-center w-full h-full justify-center flex-col">
                  {portraitIcon("w-5 h-5")}
                  <span className="text-[9px]">Square</span>
                </div>
              </Button>
              <Button
                className={cn("bg-muted-2 w-[5rem] h-[4rem]")}
                variant={"ghost"}
                size={"icon"}
              >
                <div className="flex items-center w-full h-full justify-center flex-col">
                  {landscapeIcon("w-5 h-5")}
                  <span className="text-[9px]">Square</span>
                </div>
              </Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className={cn(
                    "min-w-full mt-6 lg:mt-0 lg:min-w-[30rem] bg-accent-1 hover:bg-accent-1/80"
                  )}
                >
                  <div className="flex space-x-3 items-center">
                    <WandSparkles className="w-5 h-5" />
                    <p>Generate</p>
                  </div>
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-muted-1 border-green-500/50 min-w-[90%] lg:min-w-[70%] xl:min-w-[50%]">
                <DialogHeader>
                  <div className="flex flex-col lg:flex-row space-x-5 items-center">
                    <Image
                      src={"/images/dialog-nft.png"}
                      alt="NFT Dialog Image"
                      width={280}
                      height={312}
                      className="object-contain rounded-xl p-2 w-52 h-52 lg:h-64 lg:w-64"
                    />

                    {mintBtnClicked ? (
                      <div className="w-full h-full">
                        <MintForm
                          onClick={() => {
                            setMintBtnClicked((prev) => !prev);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full mt-4 lg:mt-0 flex flex-col justify-between">
                        <div>
                          <DialogTitle className="mb-6">NFT World</DialogTitle>
                          <DialogDescription>
                            <h2 className="text-base lg:text-lg mb-3">
                              Caption
                            </h2>
                            <p>
                              This is an image of an Imaginary nft world with
                              lots of colours and depth. It depicts An Imaginary
                              Calmness and peace
                            </p>
                          </DialogDescription>
                          <DialogFooter className="mt-3">
                            <Button variant={"link"} className="text-blue-500">
                              Generate another response
                            </Button>
                          </DialogFooter>
                        </div>

                        <div className="flex items-center w-full mt-6 h-fit justify-between lg:mt-auto self-end">
                          <Button
                            variant={"outline"}
                            className={cn(
                              "min-w-28 lg:min-w-40 border-green-300"
                            )}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            <span>Download</span>
                          </Button>

                          <Button
                            className={cn(
                              "bg-green-500 hover:bg-green-500/80 min-w-28 lg:min-w-40"
                            )}
                            onClick={() => {
                              setMintBtnClicked((prev) => !prev);
                            }}
                          >
                            <span>{mintIcon("w-4 h-4 mr-2")}</span>
                            <span>Mint</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
    </ScrollArea>
  );
}
