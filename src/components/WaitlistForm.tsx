
'use client';

import { useState } from 'react';
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
import { useToast } from "@/hooks/use-toast";
import { Book, CheckCircle, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '@/lib/firebase';
import Confetti from 'react-confetti';

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function WaitlistForm() {
    const { toast } = useToast();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            await addDoc(collection(db, 'waitlist'), {
                email: values.email,
                createdAt: serverTimestamp(),
                read: false,
            });
            setSubmitted(true);
            toast({
                title: "You're on the list!",
                description: "Thank you for your interest. We'll notify you when the book is available.",
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            toast({
                title: "An error occurred.",
                description: "Please try again later.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    }

    if (submitted) {
        return (
            <DialogContent className="sm:max-w-[480px]">
                <Confetti
                    recycle={false}
                    numberOfPieces={200}
                    width={480}
                    height={300}
                />
                <div className="flex flex-col items-center justify-center text-center p-8">
                    <CheckCircle className="size-16 text-green-500 mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">You're on the Waitlist!</h2>
                    <p className="text-muted-foreground">
                        Thank you for joining. We'll send you an email as soon as the book is available for purchase.
                    </p>
                </div>
            </DialogContent>
        );
    }

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
            <Book className="size-5" />
            Join the Book Waitlist
        </DialogTitle>
        <DialogDescription>
            Be the first to know when "How the Best Generation Built Wealth" is released.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., abdullah@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Join Waitlist
                </Button>
            </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
