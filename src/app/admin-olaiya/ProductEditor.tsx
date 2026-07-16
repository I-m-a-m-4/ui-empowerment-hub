
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { type Product } from '@/lib/products';
import { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  imageUrl: z.string().min(1, 'Image is required'),
  downloadUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  slug: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductEditorProps {
  product?: Product | null;
  onSave: () => void;
}

const IMGBB_API_KEY = 'c5caf45fb9bdceb171299e2b876deb19';

const ProductEditor = ({ product, onSave }: ProductEditorProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(product?.imageUrl || null);
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? { 
      ...product, 
      price: product.price / 100,
      downloadUrl: product.downloadUrl || '',
      slug: product.slug || '',
    } : {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      downloadUrl: '',
      slug: '',
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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const slug = data.slug || generateSlug(data.name);
      const productRef = doc(db, 'products', slug);
      
      const productData = {
          ...data,
          price: Math.round(data.price * 100), // Store price in cents
          slug,
          imageId: '', // Clear old field
          createdAt: serverTimestamp()
      }

      await setDoc(productRef, productData, { merge: true });

      toast({
        title: 'Success',
        description: `Product "${data.name}" has been ${product ? 'updated' : 'created'}.`,
      });
      onSave();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to save product.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
        <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="slug" render={({ field }) => (<FormItem><FormLabel>Slug (optional)</FormLabel><FormControl><Input {...field} placeholder="auto-generated-from-name" /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField 
          control={form.control} 
          name="price" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (in dollars)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  {...field} 
                  value={field.value || ''}
                  onChange={e => {
                    const value = parseFloat(e.target.value);
                    field.onChange(isNaN(value) ? 0 : value);
                  }} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        <FormField control={form.control} name="downloadUrl" render={({ field }) => (<FormItem><FormLabel>Download URL (for free products)</FormLabel><FormControl><Input {...field} placeholder="https://example.com/download.pdf" /></FormControl><FormMessage /></FormItem>)} />
        
        <div className="space-y-2">
            <FormLabel>Product Image</FormLabel>
            <div className="aspect-[3/4] border-2 border-dashed rounded-lg flex items-center justify-center relative bg-muted/50 w-full">
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
        
        <Button type="submit">{product ? 'Update' : 'Create'} Product</Button>
      </form>
    </Form>
  );
};

export default ProductEditor;
