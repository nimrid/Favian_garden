import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface TopSellersCardProps {
  label: string;
  handle: string;
  avatar: string;
}

export const TopSellersCard: React.FC<TopSellersCardProps> = (props) => {
  return (
    <div className="flex justify-between w-full overflow-hidden gap-2 items-center">
      <div className="flex items-center space-x-3">
        <div className="col-span-2">
          <Avatar>
            <AvatarImage src={props.avatar} />
            <AvatarFallback>
              <User className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="col-span-6">
          <h5 className="font-[600]">{props.label}</h5>
          <h6 className="mt-1 text-muted-foreground">{props.handle}</h6>
        </div>
      </div>

      {/* View Button */}
      <div className="col-span-2">
        <Button size={"sm"} variant={"primary"} className="h-7">
          View
        </Button>
      </div>
    </div>
  );
};

export default TopSellersCard;
