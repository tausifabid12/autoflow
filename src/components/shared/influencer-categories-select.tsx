"use client";
import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { CATEGORIES } from "@/lib/categories";

export function InfluencerCategoriesSelect({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const removeCategory = (categoryToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategories(
      selectedCategories.filter((c) => c !== categoryToRemove)
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="border-none">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-h-[2.5rem] h-auto justify-start border-border"
        >
          <div className="flex flex-wrap gap-1 flex-1 items-center">
            {selectedCategories.length > 0 ? (
              selectedCategories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center gap-1 bg-background text-white px-2 py-1 rounded text-sm"
                >
                  {category}
                  {/* <X
                    className="h-3 w-3 cursor-pointer hover:text-primary/70"
                    onClick={(e) => removeCategory(category, e)}
                  /> */}
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">Select categories</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-white p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <ScrollArea className="w-full h-[200px]">
            <CommandEmpty>No categories found.</CommandEmpty>
            <CommandGroup>
              {CATEGORIES.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => {
                    if (selectedCategories.includes(category)) {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category)
                      );
                    } else {
                      setSelectedCategories([...selectedCategories, category]);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCategories.includes(category)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}