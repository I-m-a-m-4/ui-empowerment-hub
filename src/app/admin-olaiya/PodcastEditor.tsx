
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { type Podcast } from '@/lib/podcasts';
import { db } from '@/lib/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';

const podcastSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().min(1, 'Album is required'),
  year: z.string().min(4, 'Year is required'),
  duration: z.string().min(1, 'Duration is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  audioSrc: z.string().url('Must be a valid URL'),
  slug: z.string().optional(),
  releaseDate: z.string().min(1, 'Release date is required'),
});

type PodcastFormValues = z.infer<typeof podcastSchema>;

interface PodcastEditorProps {
  podcast?: Podcast | null;
  onSave: () => void;
}

const IMGBB_API_KEY = 'c5caf45fb9bdceb171299e2b876deb19';

const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
};

const PodcastEditor = ({ podcast, onSave }: PodcastEditorProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(podcast?.imageUrl || null);

  const form = useForm<PodcastFormValues>({
    resolver: zodResolver(podcastSchema),
    defaultValues: podcast || {
      title: '',
      artist: 'Ismail Adekunle-Olaiya',
      album: 'Keynote Sessions',
      year: new Date().getFullYear().toString(),
      duration: '00:00',
      imageUrl: '',
      audioSrc: '',
      releaseDate: new Date().toISOString().split('T')[0],
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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

  const onSubmit = async (data: PodcastFormValues) => {
     try {
      const slug = data.slug || generateSlug(data.title);
      const podcastRef = doc(db, 'podcasts', slug);
      
      const podcastData = {
          ...data,
          slug,
          id: podcast?.id || Date.now(),
          plays: podcast?.plays || "0",
          rating: podcast?.rating || "0.0★",
          artistAvatar: podcast?.artistAvatar || 'IA',
          tags: podcast?.tags || [],
          waveform: podcast?.waveform || Array(22).fill(10).map((h, i) => h + Math.floor(Math.random() * 54)),
          createdAt: serverTimestamp()
      }

      await setDoc(podcastRef, podcastData, { merge: true });

      toast({
        title: 'Success',
        description: `Keynote session "${data.title}" has been ${podcast ? 'updated' : 'created'}.`,
      });
      onSave();
    } catch (error) {
      console.error("Failed to save keynote session:", error);
      toast({
        title: 'Error',
        description: 'Failed to save keynote session.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Keynote Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="slug" render={({ field }) => (<FormItem><FormLabel>Slug (optional)</FormLabel><FormControl><Input {...field} placeholder="auto-generated-from-title" /></FormControl><FormMessage /></FormItem>)} />
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="artist" render={({ field }) => (<FormItem><FormLabel>Speaker</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="album" render={({ field }) => (<FormItem><FormLabel>Album/Series</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="year" render={({ field }) => (<FormItem><FormLabel>Year</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
            <FormField control={form.control} name="duration" render={({ field }) => (<FormItem><FormLabel>Duration</FormLabel><FormControl><Input {...field} placeholder="e.g., 25:12" /></FormControl><FormMessage /></FormItem>)} />
        </div>
        
        <div className="space-y-2">
            <FormLabel>Session Cover Image</FormLabel>
            <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center relative bg-muted/50 w-full">
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
            <FormMessage>{form.formState.errors.imageUrl?.message}</FormMessage>
        </div>

        <FormField control={form.control} name="audioSrc" render={({ field }) => (<FormItem><FormLabel>Audio URL</FormLabel><FormControl><Input {...field} placeholder="https://example.com/audio.mp3" /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="releaseDate" render={({ field }) => (<FormItem><FormLabel>Release Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />

        <Button type="submit">{podcast ? 'Update' : 'Create'} Session</Button>
      </form>
    </Form>
  );
};

export default PodcastEditor;
