
'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const keynoteSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  description: z.string().min(1, 'Description is required'),
  priceInfo: z.string().min(1, 'Pricing info is required'),
});

type KeynoteFormValues = z.infer<typeof keynoteSchema>;

const AdminKeynotePage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const form = useForm<KeynoteFormValues>({
    resolver: zodResolver(keynoteSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      description: '',
      priceInfo: '',
    },
  });
  
  useEffect(() => {
    const fetchContent = async () => {
        try {
            const docRef = doc(db, 'siteContent', 'keynotePage');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                form.reset(docSnap.data() as KeynoteFormValues);
            }
        } catch (error) {
            console.error("Error fetching keynote content:", error);
            toast({
                title: 'Error',
                description: 'Could not load existing content.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };
    fetchContent();
  }, [form, toast]);


  const onSubmit = async (data: KeynoteFormValues) => {
    try {
      const docRef = doc(db, 'siteContent', 'keynotePage');
      await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });

      toast({
        title: 'Success',
        description: 'Keynote page content has been updated.',
      });
    } catch (error) {
      console.error("Error updating keynote content:", error);
      toast({
        title: 'Error',
        description: 'Failed to update content.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Keynote Page Content</h1>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle>Keynote Details</CardTitle>
              <CardDescription>Update the text content for the Keynote sessions page.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Page Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="subtitle" render={({ field }) => (<FormItem><FormLabel>Page Subtitle</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={5} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="priceInfo" render={({ field }) => (<FormItem><FormLabel>Pricing Information</FormLabel><FormControl><Input {...field} placeholder="e.g., Free for all of 2024" /></FormControl><FormMessage /></FormItem>)} />
                        
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </form>
                </Form>
            )}
          </CardContent>
      </Card>
    </div>
  );
};

export default AdminKeynotePage;
