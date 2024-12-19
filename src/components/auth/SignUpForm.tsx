import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { familyService } from "@/services/family";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  familyName: z.string().min(2),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      familyName: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsLoading(true);
      // Sign up the user
      const { error, data: authData } = await signUp(data.email, data.password);
      
      if (error) throw error;
      if (!authData?.user) throw new Error("Failed to create user");

      // Update user profile with full name
      await supabase
        .from("profiles")
        .update({ full_name: data.fullName })
        .eq("id", authData.user.id);

      // Create family group
      const family = await familyService.createFamily(data.familyName, authData.user.id);
      
      // Add user as admin to the family
      await familyService.addFamilyMember(family.id, authData.user.id, "admin");

      toast({
        title: "Account created!",
        description: "Welcome to TAZQ. You've been automatically added to your family group.",
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during sign up:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong during sign up. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="familyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Group Name</FormLabel>
              <FormControl>
                <Input placeholder="The Doe Family" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
