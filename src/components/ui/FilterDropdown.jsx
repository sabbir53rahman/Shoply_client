"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const FilterDropdown = ({ onFilterSelect }) => {
  const handleClick = (type, value) => {
    onFilterSelect({ type, value });
  };

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Bakery",
    "Juices",
    "Meats",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          Filter Products
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleClick("sort", "priceLow")}>
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("sort", "priceHigh")}>
            Price: High to Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("sort", "rating")}>
            Rating
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleClick("sort", "popularity")}>
            Popularity
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {categories.map((cat, i) => (
              <DropdownMenuItem
                key={i}
                onClick={() => handleClick("category", cat)}
              >
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;