import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface MyCreationCardProps {
  imageUrl: string;
  label: string;
  price: string;
  nftType: string;
}

export const MyCreationCard: React.FC<MyCreationCardProps> = ({
  imageUrl,
  label,
  price,
  nftType,
  ...props
}) => {
  return (
    <div className="p-4 bg-muted-2 h-fit w-full rounded-xl" {...props}>
      <Badge className="mb-3 min-w-14 w-fit flex items-center justify-center bg-accent-muted text-accent-1 capitalize text-sm">
        {nftType}
      </Badge>
      <div className="min-w-full min-h-[12rem]">
        <AspectRatio ratio={1 / 1} className="flex items-center justify-center">
          <Image src={imageUrl} alt={label} width={238} height={193} />
        </AspectRatio>
      </div>

      <div className="lg:mt-10 mb-3 flex justify-between items-center font-[700] text-base">
        <h3 className="text-muted-foreground">{label}</h3>
        <h5>{price}</h5>
      </div>
      <Button size={"sm"} className="bg-accent-1 hover:bg-accent-1/80">
        View
      </Button>
    </div>
  );
};

export default MyCreationCard;
