'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Rocket } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mentorshipType: z.enum(["in-person", "virtual"], {
    required_error: "You need to select a mentorship type.",
  }),
  message: z.string().optional(),
});

export default function BookingForm() {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Booking Request Sent!",
            description: "Thank you for your interest. We will get back to you shortly.",
        });
        // Here you would typically handle form submission, e.g., send an email or save to a database.
        // For this example, we'll just log to console and show a toast.
    }

  return (
    <DialogContent className="sm:max-w-[480px] bg-neutral-950 border-white/10 text-white">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
            <Rocket className="size-5" />
            Book a Mentorship Session
        </DialogTitle>
        <DialogDescription className="text-neutral-400">
            Fill out the form below to request a session. We'll get back to you to confirm the details.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Abdullah Ibn Abbas" {...field} className="bg-white/5 border-white/10 focus:ring-offset-neutral-950"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., abdullah@email.com" {...field} className="bg-white/5 border-white/10 focus:ring-offset-neutral-950"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mentorshipType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Mentorship Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="in-person" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          In-Person One-on-One ($449.99)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="virtual" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Virtual One-on-One ($139.99)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about what you'd like to discuss..."
                      className="resize-none bg-white/5 border-white/10 focus:ring-offset-neutral-950"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="submit" className="w-full bg-white text-neutral-900 hover:bg-neutral-200">
                    Send Booking Request
                </Button>
            </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
