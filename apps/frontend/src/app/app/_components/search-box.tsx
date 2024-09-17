import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import { Search } from "lucide-react";
import React, { useState } from "react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  value,
  placeholder = "Search...",
  onChange = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-md transition-all duration-300 border border-muted-2",
        isFocused && "ring-1 ring-accent-1"
      )}
    >
      <Button variant={"ghost"} size={"icon"}>
        <Search className="w-5 h-5 text-muted-foreground" />
      </Button>
      <Input
        className="pl-0 border-none bg-transparent ring-0 focus-visible:border-none focus-visible:ring-0 focus:outline-none w-full"
        value={value}
        placeholder={placeholder}
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    </div>
  );
};

export default SearchBox;
