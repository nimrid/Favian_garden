import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageContainerProps {
  url: string | StaticImageData;
  label?: string;
  className?: string;
  selected?: boolean;
  onClick: () => void;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  url,
  label,
  className,
  selected,
  onClick = () => {},
  ...props
}) => {
  return (
    <div className="aspect-auto min-w-[122px]">
      <AspectRatio ratio={2 / 3} className={cn("cursor-pointer")}>
        <Image
          src={url}
          alt={String(label)}
          width={122}
          height={156}
          className={cn(
            "object-contain",
            className,
            selected && "ring-4 cursor-pointer ring-green-500 rounded-xl"
          )}
          onClick={onClick}
          {...props}
        />
        <p className="text-center text-sm mt-2 text-white">{label}</p>
      </AspectRatio>
    </div>
  );
};

export default ImageContainer;
