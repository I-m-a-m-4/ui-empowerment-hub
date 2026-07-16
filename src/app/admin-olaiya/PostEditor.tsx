'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { type BlogPost } from '@/lib/blog-posts';
import { Loader2, Upload } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().min(1, 'Image is required'),
  author: z.string().min(1, 'Author is required'),
  date: z.string().min(1, 'Date is required'),
  content: z.string().min(1, 'Content is required'),
  slug: z.string().optional(),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostEditorProps {
  post?: BlogPost | null;
  onSave: () => void;
}

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || '';

const PostEditor = ({ post, onSave }: PostEditorProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(post?.imageUrl || null);
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: post ? { ...post } : {
      title: '',
      description: '',
      imageUrl: '',
      author: 'Ismail Adekunle-Olaiya',
      date: new Date().toISOString().split('T')[0],
      content: '',
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({ ...post });
      setImagePreview(post.imageUrl);
    } else {
      form.reset({
        title: '',
        description: '',
        imageUrl: '',
        author: 'Ismail Adekunle-Olaiya',
        date: new Date().toISOString().split('T')[0],
        content: '',
      });
      setImagePreview(null);
    }
  }, [post, form]);

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
  
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const onSubmit = async (data: PostFormValues) => {
    try {
      const slug = data.slug || generateSlug(data.title);
      const postRef = doc(db, 'blogPosts', slug);
      
      const postData = {
          ...data,
          slug,
          createdAt: serverTimestamp()
      }

      await setDoc(postRef, postData, { merge: true });

      toast({
        title: 'Success',
        description: `Post "${data.title}" has been ${post ? 'updated' : 'created'}.`,
      });
      onSave();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save post.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto p-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (optional)</FormLabel>
                  <FormControl><Input {...field} placeholder="auto-generated-from-title" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description (for previews)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="author" render={({ field }) => (<FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="date" render={({ field }) => ( <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </div>
          </div>
          <div className="space-y-2">
            <FormLabel>Featured Image</FormLabel>
            <div className="aspect-video border-2 border-dashed rounded-lg flex items-center justify-center relative bg-muted/50">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="object-contain w-full h-full" />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <Upload className="mx-auto h-8 w-8 mb-2" />
                  <p>Click below to upload an image</p>
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
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                 <Editor
                                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-key'}

                    value={field.value}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                    }}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {post ? 'Update' : 'Create'} Post
        </Button>
      </form>
    </Form>
  );
};

export default PostEditor;
