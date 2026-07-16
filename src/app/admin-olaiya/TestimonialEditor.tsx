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

export type Testimonial = {
  id?: string;
  name: string;
  title: string;
  quote: string;
  order: number;
};

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title (e.g., "Founder, ABC Corp") is required'),
  quote: z.string().min(1, 'Quote is required'),
  order: z.number().min(0, 'Order must be a positive number'),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialEditorProps {
  testimonial?: Testimonial | null;
  onSave: () => void;
}

const TestimonialEditor = ({ testimonial, onSave }: TestimonialEditorProps) => {
  const { toast } = useToast();
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: testimonial || {
      name: '',
      title: '',
      quote: '',
      order: 0,
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      const testimonialsRef = collection(db, 'testimonials');
      const docRef = testimonial?.id ? doc(testimonialsRef, testimonial.id) : doc(testimonialsRef);
      
      const testimonialData = {
        ...data,
        id: docRef.id,
        createdAt: serverTimestamp(),
      };

      await setDoc(docRef, testimonialData, { merge: true });

      toast({
        title: 'Success',
        description: `Testimonial from "${data.name}" has been ${testimonial ? 'updated' : 'created'}.`,
      });
      onSave();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to save testimonial.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Title/Company</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl><Textarea {...field} rows={5} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value || ''}
                  onChange={e => {
                    const value = parseInt(e.target.value, 10);
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{testimonial ? 'Update' : 'Create'} Testimonial</Button>
      </form>
    </Form>
  );
};

export default TestimonialEditor;
