'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { type Event } from '@/lib/events';
import { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  day: z.string().min(1, 'Day is required'),
  category: z.string().optional(),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
  featured: z.boolean().default(false),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventEditorProps {
  event?: Event | null;
  onSave: () => void;
}

const IMGBB_API_KEY = 'c5caf45fb9bdceb171299e2b876deb19';

const EventEditor = ({ event, onSave }: EventEditorProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(event?.imageUrl || null);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: event || {
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      day: '',
      category: '',
      location: '',
      imageUrl: '',
      featured: false,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const imageUrl = result.data.url;
        form.setValue('imageUrl', imageUrl);
        setImagePreview(imageUrl);
        toast({ title: 'Image uploaded successfully!' });
      } else {
        throw new Error(result.error.message || 'Image upload failed');
      }
    } catch (error: any) {
      toast({
        title: 'Image Upload Error',
        description: error.message || 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: EventFormValues) => {
    try {
      const eventsRef = collection(db, 'events');
      const docRef = event?.id ? doc(eventsRef, event.id) : doc(eventsRef);
      
      const eventData = {
        ...data,
        id: docRef.id,
        createdAt: serverTimestamp(),
      };

      await setDoc(docRef, eventData, { merge: true });

      toast({
        title: 'Success',
        description: `Event "${data.title}" has been ${event ? 'updated' : 'created'}.`,
      });
      onSave();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to save event.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="date" render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="day" render={({ field }) => (<FormItem><FormLabel>Day of Week</FormLabel><FormControl><Input {...field} placeholder="e.g., Sunday" /></FormControl><FormMessage /></FormItem>)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="category" render={({ field }) => (<FormItem><FormLabel>Category (optional)</FormLabel><FormControl><Input {...field} placeholder="e.g., Virtual Session" /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Location (optional)</FormLabel><FormControl><Input {...field} placeholder="e.g., ScaleWithOlaiya HQ" /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        <div className="space-y-2">
            <FormLabel>Event Image (for featured events)</FormLabel>
            <div className="aspect-video border-2 border-dashed rounded-lg flex items-center justify-center relative bg-muted/50">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="object-contain w-full h-full" />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <Upload className="mx-auto h-8 w-8 mb-2" />
                  <p>Click below to upload</p>
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              )}
            </div>
            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="w-full" />
        </div>
        
        <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Featured Event</FormLabel>
                        <FormMessage />
                    </div>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
        
        <Button type="submit">{event ? 'Update' : 'Create'} Event</Button>
      </form>
    </Form>
  );
};

export default EventEditor;
