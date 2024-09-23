// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib";
// import { Heart } from "lucide-react";
// import Image from "next/image";
// import React from "react";


// interface MarketPlaceCardProps {
//   id: string | number;
//   label: string;
//   tag: string;
//   price: string;
//   totalLikes: number;
//   liked: boolean;
//   createdBy: string;
//   imageUrl: string;

//   className?: string;
// }

// export const MarketPlaceCard: React.FC<MarketPlaceCardProps> = (props) => {


//   return (
//     <div
//       key={props.id}
//       className={cn("rounded-md p-4 bg-muted sm:rounded-xl", props.className)}
//     >
//       <div className="flex items-center justify-between mb-2 sm:mb-1">
//         <h3 className="text-sm sm:text-base">{props.createdBy}</h3>
//         <Badge className="sm:px-4">{props.tag}</Badge>
//       </div>

//       <AspectRatio ratio={5 / 4} className="flex items-center justify-center">
//         <Image
//           src={props.imageUrl}
//           alt={props.label}
//           width={238}
//           height={193}
//         />
//       </AspectRatio>

//       <div className="mt-2 flex items-center justify-between font-[600] text-xs sm:text-base">
//         <h2 className="text-muted-foreground">{props.label}</h2>
//         <h5>{props.price}</h5>
//       </div>

//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center space-x-1">
//           <Heart
//             className={cn(
//               "w-4 h-4 sm:w-5 sm:h-5 cursor-pointer mr-1",
//               props.liked ? "fill-red-500 text-red-500" : ""
//             )}
//           />
//           <p className="text-xs">{props.totalLikes}</p>
//         </div>

//         <Button
//           variant={"primary"}
//           size={"sm"}
//           className="text-background-1 h-6 sm:h-9"
//         >
//           Purchase
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default MarketPlaceCard;


import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { handleBuyImage } from "../../../utils/solana"; // Import the utility function for purchasing

interface MarketPlaceCardProps {
  id: string | number;
  label: string;
  tag: string;
  price: string;  // Price in SOL
  totalLikes: number;
  liked: boolean;
  createdBy: string;
  imageUrl: string;
  className?: string;
}

export const MarketPlaceCard: React.FC<MarketPlaceCardProps> = (props) => {
  const { publicKey } = useWallet(); // Get wallet info

  const handlePurchaseClick = async () => {
    if (!publicKey) {
      alert('Please connect your wallet to purchase.');
      return;
    }

    try {
      const priceInSol = parseFloat(props.price); // Convert price string to a number
      await handleBuyImage(priceInSol); // Call the buy image function
      alert('Purchase successful!');
    } catch (error) {
      console.error('Error during purchase:', error);
      alert('Purchase failed. Please try again.');
    }
  };

  return (
    <div
      key={props.id}
      className={cn("rounded-md p-4 bg-muted sm:rounded-xl", props.className)}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-1">
        <h3 className="text-sm sm:text-base">{props.createdBy}</h3>
        <Badge className="sm:px-4">{props.tag}</Badge>
      </div>

      <AspectRatio ratio={5 / 4} className="flex items-center justify-center">
        <Image
          src={props.imageUrl}
          alt={props.label}
          width={238}
          height={193}
        />
      </AspectRatio>

      <div className="mt-2 flex items-center justify-between font-[600] text-xs sm:text-base">
        <h2 className="text-muted-foreground">{props.label}</h2>
        <h5>{props.price} SOL</h5> {/* Display price in SOL */}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-1">
          <Heart
            className={cn(
              "w-4 h-4 sm:w-5 sm:h-5 cursor-pointer mr-1",
              props.liked ? "fill-red-500 text-red-500" : ""
            )}
          />
          <p className="text-xs">{props.totalLikes}</p>
        </div>

        <Button
          variant={"primary"}
          size={"sm"}
          className="text-background-1 h-6 sm:h-9"
          onClick={handlePurchaseClick}  // Trigger the purchase function
        >
          Purchase
        </Button>
      </div>
    </div>
  );
};

export default MarketPlaceCard;
