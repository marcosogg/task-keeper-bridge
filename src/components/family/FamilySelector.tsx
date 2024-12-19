import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFamily } from '@/contexts/FamilyContext';
import { Family } from '@/types/family';
import { useState } from 'react';

export function FamilySelector() {
  const { currentFamily, userFamilies, setCurrentFamily, isLoading } = useFamily();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {currentFamily?.name ?? "Select family..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search family..." />
          <CommandEmpty>No family found.</CommandEmpty>
          <CommandGroup>
            {isLoading ? (
              <CommandItem disabled>Loading families...</CommandItem>
            ) : (
              (userFamilies ?? [])
                .filter((family): family is Family => 
                  family !== null && 
                  family !== undefined && 
                  typeof family.name === 'string' && 
                  family.name.length > 0
                )
                .map((family) => (
                  <CommandItem
                    key={family.id}
                    value={family.id.toString()}
                    onSelect={() => {
                      setCurrentFamily(family);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentFamily?.id === family.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {family.name}
                  </CommandItem>
                ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
