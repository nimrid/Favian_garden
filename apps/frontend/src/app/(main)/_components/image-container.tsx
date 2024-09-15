import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface ImageContainerProps {
  url: string | StaticImageData;
  label?: string;
  className?: string;
}

export const ImageContainer: React.FC<ImageContainerProps> = ({
  url,
  label,
  className,
  ...props
}) => {
  return (
    <div className="aspect-auto min-w-[122px] min-h-[200px]">
      <AspectRatio ratio={3 / 2}>
        <Image
          src={url}
          alt={String(label)}
          width={122}
          height={156}
          className={cn("", className)}
          {...props}
        />
        <p className="text-center text-sm mt-2 text-white">{label}</p>
      </AspectRatio>
    </div>
  );
};

export default ImageContainer;
