import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFamily } from "@/contexts/FamilyContext";
import { useQuery } from "@tanstack/react-query";
import { familyService } from "@/services/family";
import { messagingService } from "@/services/messaging";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  memberId: z.string().min(1, "Please select a family member"),
});

type FormValues = z.infer<typeof formSchema>;

export function NewPrivateMessageDialog() {
  const [open, setOpen] = useState(false);
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const { currentFamily } = useFamily();
  const { toast } = useToast();

  const { data: familyMembers = [] } = useQuery({
    queryKey: ["familyMembers", currentFamily?.id],
    queryFn: () => familyService.getFamilyMembers(currentFamily!.id),
    enabled: !!currentFamily,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    if (!currentFamily) return;

    try {
      const selectedMember = familyMembers.find(
        (member) => member.profile_id === data.memberId
      );
      if (!selectedMember?.profiles) return;

      await messagingService.createChannel({
        family_id: currentFamily.id,
        name: `Chat with ${selectedMember.profiles.full_name}`,
        type: "private",
        member_ids: [data.memberId],
      });

      toast({
        title: "Private channel created",
        description: `You can now chat privately with ${selectedMember.profiles.full_name}`,
      });

      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create private channel. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Private Message</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Start Private Chat</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="memberId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Select Family Member</FormLabel>
                  <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={comboboxOpen}
                          className="w-full justify-between"
                        >
                          {field.value
                            ? familyMembers.find(
                                (member) => member.profile_id === field.value
                              )?.profiles?.full_name
                            : "Select member..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search member..." />
                        <CommandEmpty>No member found.</CommandEmpty>
                        <CommandGroup>
                          {familyMembers.map((member) => (
                            <CommandItem
                              key={member.profile_id}
                              value={member.profile_id}
                              onSelect={() => {
                                form.setValue("memberId", member.profile_id);
                                setComboboxOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === member.profile_id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {member.profiles?.full_name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Start Chat
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
