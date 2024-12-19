import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
        {isLoading ? (
          <div className="p-2">Loading families...</div>
        ) : userFamilies && userFamilies.length > 0 ? (
          <ul className="p-2">
            {userFamilies.map((family) => (
              <li key={family.id}>
                <button
                  onClick={() => {
                    setCurrentFamily(family);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full p-2 text-left hover:bg-gray-100",
                    currentFamily?.id === family.id && "bg-gray-100"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentFamily?.id === family.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {family.name}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-2">No families found.</div>
        )}
      </PopoverContent>
    </Popover>
  );
}
